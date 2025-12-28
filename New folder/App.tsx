
import React, { useState, useCallback, useEffect } from 'react';
import { ViewState, Product, Unit, CartItem } from './types.ts';
import { PRODUCTS } from './constants.tsx';
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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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
      const existing = prev.find(item => item.id === product.id && item.selectedUnit.id === unit.id);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.selectedUnit.id === unit.id) ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      }
      return [...prev, { ...product, selectedUnit: unit, cartQuantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, unitId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId && item.selectedUnit.id === unitId);
      if (existing && existing.cartQuantity > 1) {
        return prev.map(item =>
          (item.id === productId && item.selectedUnit.id === unitId) ? { ...item, cartQuantity: item.cartQuantity - 1 } : item
        );
      }
      return prev.filter(item => !(item.id === productId && item.selectedUnit.id === unitId));
    });
  }, []);

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

  const renderContent = () => {
    if (searchQuery) {
      const filtered = PRODUCTS.filter(p => 
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.nameTa.includes(searchQuery)
      );
      return (
        <div className="px-4 py-6 animate-fadeIn">
          <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-3">
             <span className="w-2 h-8 bg-green-500 rounded-full"></span>
             Results for "{searchQuery}"
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((p, idx) => (
              <div key={p.id} className={`animate-popIn`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <ProductCard 
                  product={p} 
                  onClick={() => openProduct(p)}
                  addToCart={() => addToCart(p, p.units[0])} 
                  quantity={cart.reduce((acc, curr) => curr.id === p.id ? acc + curr.cartQuantity : acc, 0)}
                  removeFromCart={() => {
                    const item = cart.find(c => c.id === p.id);
                    if (item) removeFromCart(p.id, item.selectedUnit.id);
                  }}
                  isFavorite={wishlist.includes(p.id)}
                  toggleFavorite={() => toggleWishlist(p.id)}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <div className="pb-32">
            <Banner />
            <div className="px-6 pt-10 animate-popIn stagger-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 leading-none">Fresh Markets</h2>
                  <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-widest">Selected for you</p>
                </div>
                <button className="text-[11px] font-black text-green-600 bg-green-50 px-4 py-2 rounded-2xl active:scale-95 transition-all">VIEW ALL</button>
              </div>
              <CategoryGrid onCategoryClick={() => setCurrentView('categories')} />
            </div>

            <div className="px-6 mt-12 animate-popIn stagger-2">
              <div className="flex justify-between items-center mb-6">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#f43f76] rounded-full animate-pulse"></div>
                    <h2 className="text-2xl font-black text-gray-900">Trending Now</h2>
                 </div>
                 <span className="animate-float text-[10px] font-black text-white bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1.5 rounded-full shadow-lg">HOT</span>
              </div>
              <div className="grid grid-cols-2 gap-5">
                {PRODUCTS.map((p, idx) => (
                  <div key={p.id} className="animate-popIn" style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                    <ProductCard 
                      product={p} 
                      onClick={() => openProduct(p)}
                      addToCart={() => addToCart(p, p.units[0])} 
                      quantity={cart.reduce((acc, curr) => curr.id === p.id ? acc + curr.cartQuantity : acc, 0)}
                      removeFromCart={() => {
                        const item = cart.find(c => c.id === p.id);
                        if (item) removeFromCart(p.id, item.selectedUnit.id);
                      }}
                      isFavorite={wishlist.includes(p.id)}
                      toggleFavorite={() => toggleWishlist(p.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-6 mt-12 animate-popIn stagger-3">
               <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-8 text-white relative overflow-hidden shadow-2xl group active:scale-95 transition-all cursor-pointer">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl group-hover:bg-white/20 transition-all duration-1000"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-2">Refer & Earn ₹250</h3>
                    <p className="text-sm opacity-80 mb-8 max-w-[200px] font-medium">Invite your tribe to the Green life and get instant cashback.</p>
                    <button className="bg-white text-indigo-700 px-8 py-3.5 rounded-[1.5rem] font-black text-xs uppercase shadow-xl hover:px-10 transition-all">
                      Invite Now
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
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
            isFavorite={wishlist.includes(selectedProduct.id)}
            toggleFavorite={() => toggleWishlist(selectedProduct.id)}
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
          cart={cart}
          addToCart={(p) => addToCart(p, p.units[0])}
          removeFromCart={(id) => {
             const item = cart.find(c => c.id === id);
             if (item) removeFromCart(id, item.selectedUnit.id);
          }}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
        />;
      default:
        return <div className="p-8 text-center text-gray-400">Section Coming Soon</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative overflow-x-hidden flex flex-col selection:bg-green-100">
      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && (
        <Header 
          onProfileClick={() => setCurrentView('account')} 
          onSearchChange={setSearchQuery} 
          onLocationClick={() => setCurrentView('location-picker')}
          address={userAddress}
        />
      )}
      
      <main className="flex-1 overflow-y-auto no-scrollbar relative z-10">
        {renderContent()}
      </main>

      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && (
        <BottomNav 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
        />
      )}

      {/* WhatsApp Floating Button */}
      {currentView !== 'location-picker' && currentView !== 'product-detail' && (
        <button 
          onClick={openWhatsApp}
          className="fixed bottom-36 right-6 z-[45] bg-[#25D366] text-white p-4 rounded-full shadow-[0_15px_30px_rgba(37,211,102,0.4)] animate-bounce active:scale-90 transition-transform"
        >
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </button>
      )}

      {/* Floating Checkout Bar */}
      {cart.length > 0 && currentView === 'home' && !searchQuery && (
        <div 
          onClick={() => setCurrentView('cart')}
          className={`fixed bottom-28 left-6 right-6 glass text-gray-900 p-5 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex justify-between items-center cursor-pointer transition-all hover:scale-[1.02] active:scale-95 z-[48] max-w-[400px] animate-popIn ${cartAnimate ? 'animate-cart' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-600 p-3 rounded-2xl shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)} Items Added</p>
              <p className="text-xl font-black leading-none text-gray-900">₹{cart.reduce((acc, curr) => acc + (curr.selectedUnit.price * curr.cartQuantity), 0)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider text-green-700">
            View Cart
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }} />}
    </div>
  );
};

export default App;
