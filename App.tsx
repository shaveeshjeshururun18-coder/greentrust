import React, { useState, useMemo, useEffect } from 'react';
import { Product, CartItem } from './types';
import { MASTER_PRODUCTS } from './constants';
import { HomeScreen } from './components/screens/HomeScreen';
import { ExploreScreen } from './components/screens/ExploreScreen';
import { AccountScreen } from './components/screens/AccountScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { ProductDetailsScreen } from './components/screens/ProductDetailsScreen';
import { WishlistScreen } from './components/screens/WishlistScreen';
import { OrderSuccessScreen } from './components/screens/OrderSuccessScreen';
import { AdminScreen } from './components/screens/AdminScreen'; // New
import { Assistant } from './components/Assistant';
import { VoiceListeningOverlay } from './components/VoiceListeningOverlay';

const App: React.FC = () => {
  // Global Data State (Lifted for Admin Edits)
  const [products, setProducts] = useState<Product[]>(MASTER_PRODUCTS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [location, setLocation] = useState('Detecting location...');

  // Navigation State
  const [viewStack, setViewStack] = useState<string[]>(['MAIN']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // New Features State
  const [isListening, setIsListening] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string, type: 'flat' | 'percent', value: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Loyalty State
  const [loyaltyPoints, setLoyaltyPoints] = useState(120); // Starting balance
  const [pointsRedeemed, setPointsRedeemed] = useState(0);

  // Checkout State
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  useEffect(() => {
    // Default location to Tiruppur as requested
    setLocation('Tiruppur, Tamil Nadu');
  }, []);

  useEffect(() => {
    if (useCurrentLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // Mocking a specific Tiruppur location for demo
        setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)} (Tiruppur)`);
        setDeliveryAddress(`Near New Bus Stand, Tiruppur - ${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`);
      });
    }
  }, [useCurrentLocation]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      return prev.filter(item => item.id !== id);
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const startVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchTerm('Tomato');
    }, 2000);
  };

  const applyCoupon = () => {
    setCouponError('');
    if (!couponCode) return;

    if (couponCode.toUpperCase() === 'WELCOME50') {
      setAppliedCoupon({ code: 'WELCOME50', type: 'flat', value: 50 });
      setCouponCode('');
    } else if (couponCode.toUpperCase() === 'FRESH10') {
      setAppliedCoupon({ code: 'FRESH10', type: 'percent', value: 10 });
      setCouponCode('');
    } else {
      setCouponError('Invalid Coupon Code');
      setTimeout(() => setCouponError(''), 2000);
    }
  };

  const subTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const discountAmount = useMemo(() => {
    let amount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'flat') amount += appliedCoupon.value;
      if (appliedCoupon.type === 'percent') amount += Math.round((subTotal * appliedCoupon.value) / 100);
    }
    if (pointsRedeemed > 0) {
      amount += pointsRedeemed; // 1 Point = 1 Rupee logic
    }
    return amount;
  }, [subTotal, appliedCoupon, pointsRedeemed]);

  const finalTotal = Math.max(0, subTotal - discountAmount);
  const potentialPoints = Math.floor(finalTotal * 0.02); // 2% points back

  const handleWhatsAppOrder = () => {
    setLoyaltyPoints(prev => prev - pointsRedeemed + potentialPoints);
    setCart([]);
    setAppliedCoupon(null);
    setPointsRedeemed(0);
    setIsCartOpen(false);
    setViewStack(['ORDER_SUCCESS']);

    setTimeout(() => {
      const itemsText = cart.map(item => `- ${item.name}: ${item.quantity} ${item.unit} (₹${item.price * item.quantity})`).join('%0A');
      const addressText = useCurrentLocation ? `*Location:* ${location}%0A*Address:* ${deliveryAddress}` : `*Address:* ${deliveryAddress}`;
      const contactText = whatsappNumber ? `*Contact:* ${whatsappNumber}` : '';

      const message = `*GREEN TRUST ORDER*%0A%0A${addressText}%0A${contactText}%0A%0A*Items:*%0A${itemsText}%0A%0A*Subtotal: ₹${subTotal}*%0A*Discount: -₹${discountAmount}*%0A*Grand Total: ₹${finalTotal}*%0A%0APlease confirm!`;
      window.open(`https://wa.me/919500245626?text=${message}`, '_blank');
    }, 1000);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setViewStack(prev => [...prev, 'PRODUCT_DETAILS']);
  };

  const handleBack = () => {
    setViewStack(prev => prev.slice(0, -1));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setViewStack(['MAIN']);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setViewStack(prev => [...prev, 'LOGIN']);
  };

  // Search Logic (Updated to use 'products' state instead of constant)
  const searchResults = useMemo(() => {
    if (!searchTerm) return [];
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
  }, [searchTerm, products]);

  const currentView = viewStack[viewStack.length - 1];

  useEffect(() => {
    if (activeTab === 'account' && !isLoggedIn && currentView !== 'LOGIN') {
      setViewStack(prev => [...prev, 'LOGIN']);
    }
  }, [activeTab, isLoggedIn]);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col font-sans transition-colors duration-500`}>
      {/* Top Level Overlays */}
      {isListening && <VoiceListeningOverlay onClose={() => setIsListening(false)} />}

      {currentView === 'LOGIN' && (
        <LoginScreen onLogin={() => {
          setIsLoggedIn(true);
          setViewStack(['MAIN']);
        }} />
      )}

      {currentView === 'ADMIN' && (
        <AdminScreen
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onExit={() => setViewStack(['MAIN'])}
        />
      )}

      {currentView === 'ORDER_SUCCESS' && (
        <OrderSuccessScreen onContinue={() => {
          setViewStack(['MAIN']);
          setActiveTab('home');
        }} />
      )}

      {currentView === 'WISHLIST' && (
        <WishlistScreen
          wishlist={wishlist}
          cart={cart}
          onAddToCart={addToCart}
          onRemoveFromCart={removeFromCart}
          onToggleWishlist={toggleWishlist}
          onProductClick={navigateToProduct}
          onBack={handleBack}
        />
      )}

      {currentView === 'PRODUCT_DETAILS' && selectedProduct && (
        <ProductDetailsScreen
          product={selectedProduct}
          cartQuantity={cart.find(i => i.id === selectedProduct.id)?.quantity || 0}
          onAddToCart={addToCart}
          onBack={handleBack}
        />
      )}

      {/* Main App Layout */}
      <div className={`${currentView !== 'MAIN' ? 'hidden' : 'flex flex-col h-full'}`}>
        {/* Header */}
        <header className="sticky top-0 z-[60] bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-5 py-4 shadow-sm transition-colors">
          {/* Same header content... */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-sm shadow-lg shadow-emerald-100 dark:shadow-none">
                <i className="fas fa-location-arrow"></i>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-none">{location}</span>
                  <i className="fas fa-chevron-down text-[10px] text-emerald-600"></i>
                </div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Chennai, Tamil Nadu</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-wider">Veg</div>
              <button onClick={() => setActiveTab('account')} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-600 transition"><i className="far fa-user-circle text-2xl"></i></button>
            </div>
          </div>

          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100/50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-12 text-sm font-medium placeholder:text-slate-400 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner dark:shadow-none"
            />
            <button onClick={startVoiceSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors">
              <i className="fas fa-microphone text-lg"></i>
            </button>

            {searchTerm && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 inset-x-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-2 z-[70]">
                {searchResults.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigateToProduct(p);
                      setSearchTerm('');
                    }}
                    className="flex items-center gap-3 w-full p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors text-left"
                  >
                    <img src={p.image} className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none mb-0.5">{p.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase">{p.unit}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 pb-32">
          {activeTab === 'home' && (
            <HomeScreen
              products={products}
              // Using 'products' state instead of MASTER_PRODUCTS constant via inner filtering
              // Note: HomeScreen needs update to accept 'products' prop or we rely on it importing constant.
              // To support Admin edits, we should pass filtered products or update HomeScreen.
              // For this step, I'll pass 'products' prop if I modify HomeScreen, else I will assume I need to modify HomeScreen next.
              // Actually, HomeScreen imports MASTER_PRODUCTS directly. I MUST refactor HomeScreen to accept products prop.
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchTerm={searchTerm}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              onProductClick={navigateToProduct}
              wishlist={wishlist}
              onToggleWishlist={toggleWishlist}
            />
          )}

          {activeTab === 'categories' && (
            <ExploreScreen
              categories={['All', 'Vegetables', 'Fruits', 'Packaged']}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onNavigateHome={() => setActiveTab('home')}
            />
          )}

          {activeTab === 'assistant' && (
            <div className="px-5 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Assistant cartItems={cart} />
            </div>
          )}

          {activeTab === 'account' && isLoggedIn && (
            <AccountScreen
              onLogout={handleLogout}
              isDarkMode={isDarkMode}
              toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
              onViewWishlist={() => setViewStack(prev => [...prev, 'WISHLIST'])}
              points={loyaltyPoints}
              onEnterAdmin={() => setViewStack(['ADMIN'])}
            />
          )}
        </main>

        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/70 backdrop-blur-md flex justify-end">
            <div className="absolute inset-0" onClick={() => setIsCartOpen(false)}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
              {/* Cart Header */}
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">My Basket <span className="text-emerald-600">({cart.length})</span></h2>
                <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"><i className="fas fa-times text-lg"></i></button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-5 items-center bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                    <img src={item.image} className="w-20 h-20 rounded-[1.5rem] object-cover bg-white dark:bg-slate-700 shadow-sm" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight mb-1">{item.name}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">₹{item.price} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-2xl p-1.5">
                      <button onClick={() => removeFromCart(item.id)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-rose-500"><i className="fas fa-minus text-[10px]"></i></button>
                      <span className="text-sm font-black text-slate-900 dark:text-white min-w-[20px] text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-emerald-600"><i className="fas fa-plus text-[10px]"></i></button>
                    </div>
                  </div>
                ))}

                {/* Delivery Details */}
                {cart.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Delivery Details</h3>

                    {/* Whatsapp Number */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    {/* Address & Location */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Address</label>
                        <button
                          onClick={() => setUseCurrentLocation(!useCurrentLocation)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${useCurrentLocation ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}
                        >
                          <i className="fas fa-location-crosshairs"></i> Use Current Location
                        </button>
                      </div>
                      <textarea
                        placeholder="House No, Street Area, City..."
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={3}
                        className="w-full bg-white dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900">
                {cart.length > 0 && (
                  <>
                    {/* Loyalty Points Redemption */}
                    {loyaltyPoints > 0 && (
                      <div className="mb-4 bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs shadow-lg shadow-emerald-200 dark:shadow-none">
                            <i className="fas fa-leaf"></i>
                          </div>
                          <div>
                            <p className="font-black text-emerald-800 dark:text-emerald-400 text-xs uppercase tracking-wide">Green Points Balance: {loyaltyPoints}</p>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-500/70 font-bold">1 Point = ₹1</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setPointsRedeemed(pointsRedeemed > 0 ? 0 : Math.min(loyaltyPoints, subTotal))}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors ${pointsRedeemed > 0 ? 'bg-rose-100 text-rose-600' : 'bg-emerald-600 text-white'}`}
                        >
                          {pointsRedeemed > 0 ? 'Remove' : 'Redeem'}
                        </button>
                      </div>
                    )}

                    {/* Coupon Code Input (Existing) */}
                    {!appliedCoupon && (
                      <div className="flex gap-2 mb-6">
                        <input
                          type="text"
                          placeholder="Enter Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-wider"
                        />
                        <button onClick={applyCoupon} className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 rounded-2xl font-black uppercase text-xs">Apply</button>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-slate-50 dark:border-slate-800">
                      <div className="flex justify-between items-center text-slate-400 dark:text-slate-500">
                        <span className="text-xs font-bold">Subtotal</span>
                        <span className="font-black">₹{subTotal}</span>
                      </div>
                      {pointsRedeemed > 0 && (
                        <div className="flex justify-between items-center text-emerald-500">
                          <span className="text-xs font-bold">Green Points</span>
                          <span className="font-black">-₹{pointsRedeemed}</span>
                        </div>
                      )}
                      {appliedCoupon && (
                        <div className="flex justify-between items-center text-emerald-500">
                          <span className="text-xs font-bold">Coupon ({appliedCoupon.code})</span>
                          <span className="font-black">-₹{appliedCoupon.type === 'flat' ? appliedCoupon.value : Math.round((subTotal * appliedCoupon.value) / 100)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-end mt-4">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total</span>
                        <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">₹{finalTotal}</span>
                      </div>
                      {potentialPoints > 0 && (
                        <p className="text-center text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-2">
                          You will earn {potentialPoints} Points
                        </p>
                      )}
                    </div>
                  </>
                )}

                <button
                  onClick={handleWhatsAppOrder}
                  disabled={!whatsappNumber || !deliveryAddress}
                  className="w-full bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl shadow-emerald-200 dark:shadow-emerald-900/40 active:scale-95 transition-all"
                >
                  <i className="fab fa-whatsapp text-2xl"></i> Complete Order
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Basket Notification */}
        {cart.length > 0 && !isCartOpen && (activeTab === 'home' || activeTab === 'categories') && (
          <div className="fixed bottom-32 inset-x-5 z-50 bg-slate-900 dark:bg-emerald-900 text-white p-5 rounded-[2.5rem] flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
                <i className="fas fa-basket-shopping text-xl"></i>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1.5">{cart.length} items added</p>
                <p className="text-xl font-black leading-none tracking-tight">₹{finalTotal}</p>
              </div>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="flex items-center gap-3 font-black uppercase text-[11px] tracking-[0.2em] text-emerald-400 hover:translate-x-1 transition-transform bg-white/5 py-3 px-6 rounded-2xl border border-white/10">
              View <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}

        {/* Attractive Floating Glass Menu */}
        <nav className="fixed bottom-6 inset-x-6 z-[70] h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-[2.5rem] flex items-center justify-between px-6 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 transition-all duration-500">
          {[
            { id: 'home', icon: 'fa-house', label: 'Home' },
            { id: 'categories', icon: 'fa-magnifying-glass', label: 'Explore' },
            { id: 'assistant', icon: 'fa-wand-magic-sparkles', label: 'AI Chef' },
            { id: 'account', icon: 'fa-circle-user', label: 'Profile' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-[1.5rem] transition-all duration-300 ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 w-auto' : 'bg-transparent text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 w-12 justify-center'}`}
              >
                <i className={`fa-solid ${tab.icon} ${isActive ? 'text-lg' : 'text-xl'}`}></i>
                {isActive && (
                  <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap animate-in fade-in slide-in-from-right-2 duration-300">{tab.label}</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default App;
