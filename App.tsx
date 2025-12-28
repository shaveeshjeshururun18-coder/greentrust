
import React, { useState, useCallback, useEffect } from 'react';
import { ViewState, Product, Unit, CartItem } from './types.ts';
import { PRODUCTS, ALL_PRODUCTS, DETAILED_CATEGORIES } from './constants.tsx';
import Header from './components/Header.tsx';
import DesktopHeader from './components/DesktopHeader.tsx';
import AnimatedBanner from './components/AnimatedBanner.tsx';
import CategoryGrid from './components/CategoryGrid.tsx';
import ProductCard from './components/ProductCard.tsx';
import BottomNav from './components/BottomNav.tsx';
import CartView from './components/CartView.tsx';
import CategoriesView from './components/CategoriesView.tsx';

import AccountView from './components/AccountView.tsx';
import LoginModal from './components/LoginModal.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import WishlistView from './components/WishlistView.tsx';
import LocationPicker from './components/LocationPicker.tsx';
import BackgroundAnimation from './components/BackgroundAnimation.tsx';
import DesktopHero from './components/DesktopHero.tsx';

// Inside App component
// Inside App component
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
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  // Trigger cart pulse animation
  useEffect(() => {
    if (cart.length > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  // Toast is now persistent until clicked or replaced

  const addToCart = useCallback((product: Product, unit: Unit) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedUnit.id === unit.id);
      let newCart;

      if (existing) {
        newCart = prev.map(item =>
          (item.id === product.id && item.selectedUnit.id === unit.id) ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
        );
      } else {
        newCart = [...prev, { ...product, selectedUnit: unit, cartQuantity: 1 }];
      }

      // Calculate specific item quantity for toast
      const updatedItem = newCart.find(item => item.id === product.id && item.selectedUnit.id === unit.id);
      const itemQty = updatedItem ? updatedItem.cartQuantity : 1;

      setToast({ show: true, message: `Added ${product.nameEn} (Qty: ${itemQty})` });

      return newCart;
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 20);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/919500245626?text=Hi Green Trust, I need support.', '_blank');
  };

  const renderContent = () => {
    if (searchQuery && currentView !== 'categories') {
      // 1. Filter Products
      const filteredProducts = ALL_PRODUCTS.filter(p =>
        p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.nameTa && p.nameTa.includes(searchQuery))
      );

      // 2. Filter Categories/Subcategories
      const filteredCategories = DETAILED_CATEGORIES.flatMap(cat => {
        const matchesCat = cat.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Find matching subcategories
        const matchingSubs = cat.subcategories.filter(sub =>
          sub.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const results: { type: 'main' | 'sub', data: any, parent?: string }[] = [];

        if (matchesCat) results.push({ type: 'main', data: cat });
        if (matchingSubs.length > 0) {
          matchingSubs.forEach(sub => results.push({ type: 'sub', data: sub, parent: cat.name }));
        }

        return results;
      });

      return (
        <div className="px-4 py-6 animate-fadeIn pb-24 md:pb-6">

          {/* Display Matching Categories */}
          {filteredCategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-green-600"></i>
                Matching Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredCategories.map((item: any, idx) => (
                  <div
                    onClick={() => {
                      setCurrentView('categories');
                      setSearchQuery('');
                      const matchingDetailedCat = DETAILED_CATEGORIES.find(c => c.name === item.data.name || c.id === item.data.id);
                      if (matchingDetailedCat) setSelectedCategory(matchingDetailedCat.id);
                      else if (item.parent) {
                        // If it's a subcategory, we should ideally select the parent category
                        const parentCat = DETAILED_CATEGORIES.find(c => c.name === item.parent);
                        if (parentCat) setSelectedCategory(parentCat.id);
                      }
                    }}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3 cursor-pointer hover:border-green-500 transition-all hover:shadow-md"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <i className={`fa-solid ${item.type === 'main' ? item.data.icon : 'fa-tag'}`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{item.data.name}</p>
                      {item.type === 'sub' && <p className="text-[10px] text-slate-400 uppercase font-bold">in {item.parent}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-carrot text-green-600"></i>
                Matching Products ({filteredProducts.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 max-w-[1920px] mx-auto">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => openProduct(product)}
                    onAdd={(unit) => addToCart(product, unit)}
                    onRemove={(unitId) => {
                      const item = cart.find(c => c.id === product.id && c.selectedUnit.id === unitId);
                      if (item) removeFromCart(product.id, unitId);
                    }}
                    getQuantity={(unitId) => {
                      const item = cart.find(c => c.id === product.id && c.selectedUnit.id === unitId);
                      return item ? item.cartQuantity : 0;
                    }}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={() => toggleWishlist(product.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            filteredCategories.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl">
                  🤷‍♂️
                </div>
                <p className="text-lg font-bold text-slate-600 dark:text-slate-400">No products found for "{searchQuery}"</p>
                <p className="text-sm text-slate-400">Try searching for "Tomato", "Apple", or "Snacks"</p>
              </div>
            )
          )}
        </div>
      );
    }

    switch (currentView) {
      case 'categories':
        return (
          <CategoriesView
            onBack={() => setCurrentView('home')}
            onProductClick={openProduct}
            cart={cart}
            getQuantity={(pid, uid) => {
              const item = cart.find(c => c.id === pid && c.selectedUnit.id === uid);
              return item ? item.cartQuantity : 0;
            }}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            searchQuery={searchQuery}
            initialCategoryId={selectedCategory}
          />
        );
      case 'home':
        return (
          <div className="pb-32">
            <AnimatedBanner />
            <div className="px-6 pt-10 animate-popIn stagger-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-none">Fresh Markets</h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-bold mt-2 uppercase tracking-widest">Selected for you</p>
                </div>
                <button onClick={() => setCurrentView('categories')} className="text-[11px] font-black text-green-600 bg-green-50 px-4 py-2 rounded-2xl active:scale-95 transition-all">VIEW ALL</button>
              </div>
              <CategoryGrid onCategoryClick={(id) => {
                setSelectedCategory(id);
                setCurrentView('categories');
              }} />
            </div>

            <div className="px-6 mt-12 animate-popIn stagger-2">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-[#f43f76] rounded-full animate-pulse"></div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Trending Now</h2>
                </div>
                <span className="animate-float text-[10px] font-black text-white bg-gradient-to-r from-pink-500 to-orange-400 px-3 py-1.5 rounded-full shadow-lg">HOT</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {ALL_PRODUCTS.slice(0, 10).map((p, idx) => (
                  <div key={p.id} className="animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
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

            {/* FARM FRESH VEGETABLES */}
            <div className="px-6 mt-12 animate-popIn stagger-3">
              <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Farm Fresh Vegetables</h2>
                </div>
                <button
                  onClick={() => { setSelectedCategory('dc1'); setCurrentView('categories'); }}
                  className="text-[11px] font-black text-green-600 bg-green-50 px-4 py-2 rounded-2xl active:scale-95 transition-all"
                >
                  VIEW ALL
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {ALL_PRODUCTS.filter(p => p.category === 'Vegetables').slice(0, 5).map((p, idx) => (
                  <div key={p.id} className="animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
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

            {/* SEASONAL FRUITS */}
            <div className="px-6 mt-12 animate-popIn stagger-4">
              <div className="flex justify-between items-end mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-orange-400 rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Seasonal Fruits</h2>
                </div>
                <button
                  onClick={() => { setSelectedCategory('dc2'); setCurrentView('categories'); }}
                  className="text-[11px] font-black text-orange-500 bg-orange-50 px-4 py-2 rounded-2xl active:scale-95 transition-all"
                >
                  VIEW ALL
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {ALL_PRODUCTS.filter(p => p.category === 'Fruits').slice(0, 5).map((p, idx) => (
                  <div key={p.id} className="animate-popIn" style={{ animationDelay: `${0.1 * idx}s` }}>
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
    <div className={`w-full ${currentView === 'categories' ? '' : 'md:max-w-6xl mx-auto'} h-screen relative overflow-hidden flex flex-col selection:bg-green-100 ${isDark ? 'dark text-white' : ''}`}>
      <BackgroundAnimation />
      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && (
        <>
          <div className="md:hidden">
            <Header
              onProfileClick={() => setCurrentView('account')}
              onSearchChange={setSearchQuery}
              onLocationClick={() => setCurrentView('location-picker')}
              onWishlistClick={() => setCurrentView('wishlist')}
              address={userAddress}
              isDark={isDark}
              toggleTheme={toggleTheme}
              isScrolled={isScrolled}
            />
          </div>
          <DesktopHeader
            currentView={currentView}
            setCurrentView={setCurrentView}
            onSearchChange={setSearchQuery}
            cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
            wishlistCount={wishlist.length}
            isDark={isDark}
            toggleTheme={toggleTheme}
            isScrolled={isScrolled}
          />
        </>
      )}

      <main
        className="flex-1 overflow-y-auto no-scrollbar relative z-10"
        onScroll={handleScroll}
      >
        {renderContent()}
      </main>

      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && (
        <div className="md:hidden">
          <BottomNav
            currentView={currentView}
            setCurrentView={setCurrentView}
            cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
          />
        </div>
      )}

      {/* Sticky WhatsApp Order Button - Visible in all views except technical overlays */}
      {currentView !== 'location-picker' && (
        <a
          href="https://wa.me/919500245626?text=Hi Green Trust, I would like to place an order."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-24 right-5 z-[50] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_10px_20px_rgba(37,211,102,0.5)] border-4 border-white dark:border-slate-900 active:scale-90 transition-transform animate-bounce-slow"
        >
          <i className="fa-brands fa-whatsapp text-3xl"></i>
        </a>
      )}

      {/* Green Floating Cart Icon - Mobile Only, shows when items in cart, but not in cart view */}
      {cart.length > 0 && currentView !== 'cart' && currentView !== 'product-detail' && (
        <div
          onClick={() => setCurrentView('cart')}
          className="fixed bottom-6 right-5 z-[50] md:hidden flex items-center gap-3 bg-green-600 text-white pl-4 pr-2 py-2 rounded-full shadow-[0_10px_30px_rgba(22,163,74,0.5)] border-4 border-white dark:border-slate-900 active:scale-95 transition-transform animate-slideUp"
        >
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-medium opacity-80 uppercase tracking-wide">{cart.reduce((a, c) => a + c.cartQuantity, 0)} Items</span>
            <span className="font-black text-lg">₹{cart.reduce((a, c) => a + (c.selectedUnit.price * c.cartQuantity), 0)}</span>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={() => { setIsLoggedIn(true); setShowLogin(false); }} />}

      {/* Global Toast Notification - Persistent & Interactive */}
      <div
        onClick={() => { setCurrentView('cart'); setToast(prev => ({ ...prev, show: false })); }}
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl text-white pl-4 pr-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/10 cursor-pointer hover:scale-105 active:scale-95 transition-transform group">
          <div className="bg-green-500 rounded-xl p-2 shadow-lg shadow-green-500/30 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-gray-100">{toast.message}</span>
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-0.5 group-hover:underline">Tap to View Cart &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
