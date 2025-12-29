
import React, { useState, useCallback, useEffect } from 'react';
import Draggable from './components/Draggable';
import { ViewState, Product, Unit, CartItem } from './types.ts';
import { auth, db } from './firebaseConfig.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { PRODUCTS, ALL_PRODUCTS, DETAILED_CATEGORIES } from './constants.tsx';
import Header from './components/Header.tsx';
import DesktopHeader from './components/DesktopHeader.tsx';
import AnimatedBanner from './components/AnimatedBanner.tsx';
import CategoryGrid from './components/CategoryGrid.tsx';
import ProductCard from './components/ProductCard.tsx';
import BottomNav from './components/BottomNav.tsx';
import CartView from './components/CartView.tsx';
import CategoriesView from './components/CategoriesView.tsx';
import AllCategoriesView from './components/AllCategoriesView.tsx';

import AccountView from './components/AccountView.tsx';
import LoginModal from './components/LoginModal.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import WishlistView from './components/WishlistView.tsx';
import LocationPicker from './components/LocationPicker.tsx';
import BackgroundAnimation from './components/BackgroundAnimation.tsx';
import DesktopHero from './components/DesktopHero.tsx';
import DeveloperView from './components/DeveloperView.tsx';
import AIAssistant from './components/AIAssistant.tsx';

import BasketBuddyView from './components/BasketBuddyView.tsx';
import Footer from './components/Footer.tsx';

// Inside App component
// EntranceScreen import removed

// Inside App component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  // showEntrance state removed
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userAddress, setUserAddress] = useState('Vivekananda Nagar, Chennai');
  const [cartAnimate, setCartAnimate] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldOpenFilter, setShouldOpenFilter] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsLoggedIn(true);
        setUser(firebaseUser);

        // Load data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();

            // Sync Cart: Merge guest data into account data
            setCart(currentCart => {
              const accountCart = userData.cart || [];
              if (currentCart.length === 0) return accountCart;

              const mergedCart = [...accountCart];
              currentCart.forEach(guestItem => {
                const existingIndex = mergedCart.findIndex(item =>
                  item.id === guestItem.id && item.selectedUnit.id === guestItem.selectedUnit.id
                );
                if (existingIndex > -1) {
                  mergedCart[existingIndex].cartQuantity += guestItem.cartQuantity;
                } else {
                  mergedCart.push(guestItem);
                }
              });
              return mergedCart;
            });

            // Sync Wishlist
            setWishlist(currentWishlist => {
              const accountWishlist = userData.wishlist || [];
              if (currentWishlist.length === 0) return accountWishlist;
              return Array.from(new Set([...accountWishlist, ...currentWishlist]));
            });
          }
        } catch (error) {
          console.error("Error loading user data:", error);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        // On logout, should we clear cart? 
        // Typically yes, or keep it as guest cart. 
        // Let's keep it as is for a smooth transition back to guest mode.
      }
    });
    return () => unsubscribe();
  }, []); // Only run on mount, but uses cart/wishlist refs? 
  // Actually, wait. Merging logic needs to handle dependencies carefully. 

  // Sync Cart to Firestore
  useEffect(() => {
    if (user) {
      const syncCart = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            cart: cart,
            lastUpdated: serverTimestamp()
          }, { merge: true });
        } catch (e) {
          console.error("Error syncing cart:", e);
        }
      };

      const timeout = setTimeout(syncCart, 1000); // Debounce sync
      return () => clearTimeout(timeout);
    }
  }, [cart, user]);

  // Sync Wishlist to Firestore
  useEffect(() => {
    if (user) {
      const syncWishlist = async () => {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            wishlist: wishlist,
            lastUpdated: serverTimestamp()
          }, { merge: true });
        } catch (e) {
          console.error("Error syncing wishlist:", e);
        }
      };

      const timeout = setTimeout(syncWishlist, 1000); // Debounce sync
      return () => clearTimeout(timeout);
    }
  }, [wishlist, user]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  // Trigger cart pulse animation
  useEffect(() => {
    if (cart.length > 0) {
      setCartAnimate(true);
      const timer = setTimeout(() => setCartAnimate(false), 400);
      return () => clearTimeout(timer);
    }
  }, [cart]);

  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'cart' | 'wishlist' | 'info' }>({ show: false, message: '', type: 'info' });

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

      setToast({ show: true, message: `Added ${product.nameEn} (Qty: ${itemQty})`, type: 'cart' });

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
    setWishlist(prev => {
      const isRemoving = prev.includes(productId);
      const newWishlist = isRemoving ? prev.filter(id => id !== productId) : [...prev, productId];

      localStorage.setItem('wishlist', JSON.stringify(newWishlist));

      const product = ALL_PRODUCTS.find(p => p.id === productId);
      const name = product ? product.nameEn : 'Item';

      setToast({
        show: true,
        message: isRemoving ? `Removed ${name} from Favorites 💔` : `Added ${name} to Favorites ❤️`,
        type: 'wishlist'
      });

      return newWishlist;
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShouldOpenFilter(false);
    setCurrentView('categories');
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const getQuantity = useCallback((pid: string, uid: string) => {
    const item = cart.find(c => c.id === pid && c.selectedUnit.id === uid);
    return item ? item.cartQuantity : 0;
  }, [cart]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setIsScrolled(scrollTop > 20);
  };

  const renderContent = () => {
    // Global Search Override: If there is a search query AND we are not in categories view, show search results
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


          {/* Display Matching Products First */}
          {filteredProducts.length > 0 && (
            <div className="mb-8">
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
                    addToCart={() => addToCart(product, product.units[0])}
                    removeFromCart={() => {
                      const item = cart.find(c => c.id === product.id);
                      if (item) removeFromCart(product.id, item.selectedUnit.id);
                    }}
                    quantity={cart.reduce((acc, curr) => curr.id === product.id ? acc + curr.cartQuantity : acc, 0)}
                    isFavorite={wishlist.includes(product.id)}
                    toggleFavorite={() => toggleWishlist(product.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Display Matching Categories Second */}
          {filteredCategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-green-600"></i>
                Matching Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredCategories.map((item: any, idx) => (
                  <div
                    key={idx}
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
                      <i className={`fa-solid ${item.data?.icon || 'fa-tag'}`}></i>
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

          {/* Empty State */}
          {filteredProducts.length === 0 && filteredCategories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-3xl">
                🤷‍♂️
              </div>
              <p className="text-lg font-bold text-slate-600 dark:text-slate-400">No products found for "{searchQuery}"</p>
              <p className="text-sm text-slate-400">Try searching for "Tomato", "Apple", or "Snacks"</p>
            </div>
          )}
        </div>
      );
    }

    switch (currentView) {
      case 'all-categories':
        return (
          <AllCategoriesView
            onCategoryClick={handleCategoryClick}
            onSearchChange={setSearchQuery}
            cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
          />
        );
      case 'categories':
        return (
          <CategoriesView
            onBack={() => setCurrentView('home')}
            onProductClick={openProduct}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            getQuantity={getQuantity}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            initialCategoryId={selectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            initialFilterOpen={shouldOpenFilter}
          />
        );
      case 'home':
        return (
          <div className="pb-32">
            <AnimatedBanner />

            {/* Categories Rail */}
            <div className="px-6 pt-10 animate-popIn stagger-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black text-gray-800 dark:text-white tracking-tight">Shop by Category</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-200">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>
              <CategoryGrid
                categories={DETAILED_CATEGORIES}
                onCategoryClick={handleCategoryClick}
                activeCategory={selectedCategory}
              />
            </div>

            {/* Trending Section */}
            <div className="px-6 mt-12 animate-popIn stagger-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-[10px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md mb-2 inline-block">Hot Picks</span>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Trending Now</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('categories');
                  }}
                  className="text-xs font-black text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 md:flex md:overflow-x-auto md:no-scrollbar md:gap-6 md:pb-4 gap-4">
                {ALL_PRODUCTS.slice(0, 10).map((p, idx) => (
                  <div key={p.id} className="md:min-w-[200px] lg:min-w-[220px] h-full">
                    <ProductCard
                      key={p.id}
                      product={p}
                      onClick={() => openProduct(p)}
                      addToCart={() => addToCart(p, p.units[0])}
                      quantity={cart.reduce((acc, curr) => curr.id === p.id ? acc + curr.cartQuantity : acc, 0)}
                      removeFromCart={() => {
                        const item = cart.find(c => c.id === p.id);
                        if (item) removeFromCart(p.id, item.selectedUnit.id);
                      }}
                      toggleFavorite={() => toggleWishlist(p.id)}
                      isFavorite={wishlist.includes(p.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Farm Fresh Vegetables Section */}
            <div className="px-6 mt-12 animate-popIn stagger-3">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Farm Fresh Vegetables</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('dc1');
                    setCurrentView('categories');
                  }}
                  className="text-xs font-black text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  View All
                </button>
              </div>
              <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 h-full">
                {ALL_PRODUCTS.filter(p => p.category === 'Vegetables').slice(0, 5).map(p => (
                  <div key={p.id} className="min-w-[160px] h-full">
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

            {/* Seasonal Fruits Section */}
            <div className="px-6 mt-12 animate-popIn stagger-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">Seasonal Fruits</h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('dc2');
                    setCurrentView('categories');
                  }}
                  className="text-xs font-black text-gray-400 hover:text-green-600 transition-colors uppercase tracking-widest"
                >
                  View All
                </button>
              </div>
              <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 h-full">
                {ALL_PRODUCTS.filter(p => p.category === 'Fruits').slice(0, 5).map(p => (
                  <div key={p.id} className="min-w-[160px] h-full">
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

            <div className="px-6 mt-12 mb-6 animate-popIn stagger-5">
              <div className="bg-[#064e3b] rounded-[2.5rem] p-8 text-center relative overflow-hidden group cursor-pointer shadow-xl shadow-green-950/20" onClick={() => setCurrentView('categories')}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 py-4">
                  <span className="text-[11px] font-black text-green-400 uppercase tracking-[0.2em] mb-3 block">Explore More</span>
                  <h3 className="text-3xl font-black text-white mb-8 tracking-tighter drop-shadow-md">Fresh Markets</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentView('categories');
                    }}
                    className="bg-white text-[#064e3b] px-10 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl"
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            <Footer />
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
          isLoggedIn={isLoggedIn}
          onLoginReq={() => setShowLogin(true)}
        />;
      case 'location-picker':
        return <LocationPicker
          onConfirm={(addr) => { setUserAddress(addr); setCurrentView('home'); }}
          onBack={() => setCurrentView('home')}
        />;
      case 'account':
        return <AccountView onLoginClick={() => setShowLogin(true)} isLoggedIn={isLoggedIn} user={user} toggleTheme={toggleTheme} isDark={isDark} />;
      case 'wishlist':
        return <WishlistView
          onBack={() => setCurrentView('home')}
          wishlistItems={ALL_PRODUCTS.filter(p => wishlist.includes(p.id))}
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
      case 'basketbuddy':
        return <BasketBuddyView
          onBack={() => setCurrentView('home')}
          onNavigate={setCurrentView}
          onSelectCategory={setSelectedCategory}
        />;
      case 'developer':
        return <DeveloperView onBack={() => setCurrentView('account')} />;
      default:
        return <div className="p-8 text-center text-gray-400">Section Coming Soon</div>;
    }
  };

  return (
    <div className={`w-full ${currentView === 'categories' ? '' : 'md:max-w-6xl mx-auto'} h-screen relative overflow-hidden flex flex-col selection:bg-green-100 ${isDark ? 'dark text-white' : ''}`}>
      <BackgroundAnimation />
      {/* Entrance Screen removed as per request, using index.html splash instead */}

      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && (
        <>
          {/* Mobile Header: Visible on Home only (mostly) to avoid duplication */}
          {currentView !== 'basketbuddy' && currentView !== 'all-categories' && currentView !== 'categories' && (
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
                onFilterClick={() => {
                  setShouldOpenFilter(true);
                  setCurrentView('categories');
                }}
                showFilter={false} // Hide Filter on Home
              />
            </div>
          )}

          {/* Desktop Header: Visible on Categories/BasketBuddy too */}
          <DesktopHeader
            currentView={currentView}
            setCurrentView={setCurrentView}
            onSearchChange={setSearchQuery}
            cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
            wishlistCount={wishlist.length}
            isDark={isDark}
            toggleTheme={toggleTheme}
            isScrolled={isScrolled}
            onFilterClick={() => {
              setShouldOpenFilter(true);
              setCurrentView('categories');
            }}
          />
        </>
      )}

      <main
        className="flex-1 overflow-y-auto no-scrollbar relative z-10"
        onScroll={handleScroll}
      >
        {renderContent()}
      </main>

      {currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'location-picker' && currentView !== 'basketbuddy' && (
        <div className="md:hidden">
          <BottomNav
            currentView={currentView}
            setCurrentView={setCurrentView}
            cartCount={cart.reduce((acc, curr) => acc + curr.cartQuantity, 0)}
          />
        </div>
      )}

      {/* Floating Buttons Removed */}

      {/* Green Floating Cart Icon - Mobile Only */}
      {cart.length > 0 && currentView !== 'cart' && currentView !== 'product-detail' && currentView !== 'basketbuddy' && (
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

      {/* Global Toast Notification */}
      <div
        onClick={() => {
          if (toast.type === 'cart') setCurrentView('cart');
          if (toast.type === 'wishlist') setCurrentView('wishlist');
          setToast(prev => ({ ...prev, show: false }));
        }}
        className={`hidden md:block fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${toast.show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'}`}
      >
        <div className="bg-gray-900/95 backdrop-blur-xl text-white pl-4 pr-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center gap-4 border border-white/10 cursor-pointer hover:scale-105 active:scale-95 transition-transform group">
          <div className="bg-green-500 rounded-xl p-2 shadow-lg shadow-green-500/30 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-wide text-gray-100">{toast.message}</span>
            <span className="text-[10px] font-black text-green-400 uppercase tracking-widest mt-0.5 group-hover:underline">
              {toast.type === 'cart' ? 'Tap to View Cart →' : toast.type === 'wishlist' ? 'Tap to View Favorites →' : 'Dismiss'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
