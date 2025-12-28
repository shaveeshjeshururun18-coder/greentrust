
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ViewState, Product, Unit, CartItem } from './types.ts';
import { PRODUCTS, CATEGORIES } from './constants.tsx';
import Header from './components/Header.tsx';
import Banner from './components/Banner.tsx';
import CategoryGrid from './components/CategoryGrid.tsx';
import ProductCard from './components/ProductCard.tsx';
import BottomNav from './components/BottomNav.tsx';
import CartView from './components/CartView.tsx';
import AccountView from './components/AccountView.tsx';
import LoginModal from './components/LoginModal.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import WishlistView from './components/WishlistView.tsx';
import LocationPicker from './components/LocationPicker.tsx';
import VoiceSearchModal from './components/VoiceSearchModal.tsx';
import OrderTracking from './components/OrderTracking.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [userAddress, setUserAddress] = useState('Vivekananda Nagar, Chennai');
  const [cartAnimate, setCartAnimate] = useState(false);

  // Trigger cart pulse animation
  useEffect(() => {
    if (cart.length > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const addToCart = useCallback((product: Product, unit: Unit) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedUnit.name === unit.name);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedUnit.name === unit.name) ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prev, { ...product, selectedUnit: unit, cartQuantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, unitName: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId && item.selectedUnit.name === unitName);
      if (existing && existing.cartQuantity > 1) {
        return prev.map(item =>
          (item.id === productId && item.selectedUnit.name === unitName) ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
        );
      }
      return prev.filter(item => !(item.id === productId && item.selectedUnit.name === unitName));
    });
  }, []);

  const getQuantity = useCallback((productId: string, unitName: string) => {
    const item = cart.find(c => c.id === productId && c.selectedUnit.name === unitName);
    return item ? item.cartQuantity : 0;
  }, [cart]);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919500245626?text=Hi Green Trust, I need support.', '_blank');
  };

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (searchQuery) {
      result = result.filter(p =>
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nameTa.includes(searchQuery) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    return result;
  }, [searchQuery, activeCategory]);

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="pb-32 animate-fadeIn">
            <Banner />

            <CategoryGrid
              categories={CATEGORIES}
              onCategoryClick={(cat) => setActiveCategory(prev => prev === cat ? 'All' : cat)}
              activeCategory={activeCategory}
            />

            <div className="px-6 mt-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-emerald-500 rounded-full animate-pulse-soft"></div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeCategory === 'All' ? 'Special For You' : activeCategory}
                  </h2>
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{filteredProducts.length} Items</span>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {filteredProducts.map((p, idx) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onProductClick={openProduct}
                    onAddToCart={addToCart}
                    onRemoveFromCart={removeFromCart}
                    getQuantity={getQuantity}
                    isWishlisted={wishlist.includes(p.id)}
                    onWishlistToggle={toggleWishlist}
                  />
                ))}
              </div>
            </div>

            {/* Promo Card */}
            <div className="px-6 mt-12 mb-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl group active-pop cursor-pointer">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-2 leading-tight">Green Trust<br />Loyalty Club</h3>
                  <p className="text-sm opacity-80 mb-8 max-w-[180px] font-medium">Join now and get exclusive discounts on every organic purchase.</p>
                  <button className="bg-white text-emerald-800 px-8 py-3.5 rounded-2xl font-black text-xs uppercase shadow-xl hover:px-10 transition-all">
                    Join Today
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('home')}
            onAddToCart={addToCart}
            onRemoveFromCart={removeFromCart}
            getQuantity={getQuantity}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onWishlistToggle={toggleWishlist}
            onSimilarProductClick={openProduct}
          />
        ) : null;
      case 'cart':
        return <CartView
          cart={cart}
          address={userAddress}
          onBack={() => setCurrentView('home')}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          getQuantity={getQuantity}
          clearCart={clearCart}
          onExploreProducts={() => setCurrentView('home')}
        />;
      case 'location-picker':
        return <LocationPicker
          onConfirm={(addr) => { setUserAddress(addr); setCurrentView('home'); }}
          onBack={() => setCurrentView('home')}
        />;
      case 'account':
        return <AccountView onLoginClick={() => setShowLogin(true)} isLoggedIn={isLoggedIn} />;
      case 'wishlist':
        return <WishlistView
          onBack={() => setCurrentView('home')}
          wishlistItems={PRODUCTS.filter(p => wishlist.includes(p.id))}
          onProductClick={openProduct}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          getQuantity={getQuantity}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />;
      case 'orders':
        return <OrderTracking onBack={() => setCurrentView('home')} />;
      case 'food':
        return <div className="p-10 text-center animate-fadeIn">
          <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-emerald-500">
            <i className="fa-solid fa-plate-wheat text-4xl"></i>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Organic Kitchen</h2>
          <p className="text-slate-400 font-medium">Ready-to-eat organic meals coming soon!</p>
        </div>;
      case 'bolt':
        return <div className="p-10 text-center animate-fadeIn text-slate-900">
          <div className="w-24 h-24 bg-amber-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-amber-500">
            <i className="fa-solid fa-bolt-lightning text-4xl"></i>
          </div>
          <h2 className="text-2xl font-black mb-2">Bolt Delivery</h2>
          <p className="text-slate-400 font-medium">Ultra-fast 5-minute delivery in your area.</p>
        </div>;
      case '99store':
        return <div className="p-10 text-center animate-fadeIn text-slate-900">
          <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-blue-500">
            <i className="fa-solid fa-tags text-4xl"></i>
          </div>
          <h2 className="text-2xl font-black mb-2">99 Store</h2>
          <p className="text-slate-400 font-medium">Everything under ₹99. Budget organic living.</p>
        </div>;
      case 'deal-rush':
        return <div className="p-10 text-center animate-fadeIn text-slate-900">
          <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-rose-500">
            <i className="fa-solid fa-fire-glow text-4xl"></i>
          </div>
          <h2 className="text-2xl font-black mb-2">Deal Rush</h2>
          <p className="text-slate-400 font-medium">Hourly flash deals on organic essentials.</p>
        </div>;
      default:
        return <div className="p-8 text-center text-slate-400">Section Coming Soon</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-x-hidden flex flex-col bg-slate-50 selection:bg-emerald-100 font-sans antialiased text-slate-900">
      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && currentView !== 'orders' && (
        <Header
          onProfileClick={() => setCurrentView('account')}
          onSearchChange={setSearchQuery}
          onLocationClick={() => setCurrentView('location-picker')}
          onVoiceClick={() => setShowVoiceSearch(true)}
          address={userAddress}
        />
      )}

      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        {renderContent()}
      </main>

      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && currentView !== 'orders' && (
        <BottomNav
          currentView={currentView}
          setCurrentView={setCurrentView}
          cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
        />
      )}

      {/* WhatsApp Floating Button */}
      {currentView !== 'location-picker' && currentView !== 'product-detail' && currentView !== 'orders' && (
        <button
          onClick={openWhatsApp}
          className="fixed bottom-36 right-6 z-[45] bg-[#25D366] text-white p-4 rounded-full shadow-2xl active-pop animate-float"
        >
          <i className="fa-brands fa-whatsapp text-3xl"></i>
        </button>
      )}

      {/* Floating Checkout Bar */}
      {cart.length > 0 && currentView === 'home' && !searchQuery && (
        <div
          onClick={() => setCurrentView('cart')}
          className={`fixed bottom-28 left-6 right-6 glass text-slate-900 p-5 rounded-[2.5rem] shadow-2xl flex justify-between items-center cursor-pointer active-pop transition-all z-[48] max-w-[400px] animate-popIn ${cartAnimate ? 'animate-pulse-soft' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-emerald-500 p-3 rounded-2xl shadow-lg shadow-emerald-100">
              <i className="fa-solid fa-cart-shopping text-white text-xl"></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{cart.length} Items Added</p>
              <p className="text-xl font-black leading-none text-slate-900 tracking-tight">₹{cart.reduce((acc, curr) => acc + (curr.selectedUnit.price * curr.cartQuantity), 0)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-emerald-600">
            Checkout
            <i className="fa-solid fa-chevron-right animate-bounce-x"></i>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }} />}

      {showVoiceSearch && (
        <VoiceSearchModal
          onClose={() => setShowVoiceSearch(false)}
          onResult={(text) => {
            setSearchQuery(text);
          }}
        />
      )}
    </div>
  );
};

export default App;
