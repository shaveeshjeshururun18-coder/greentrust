import React, { useMemo } from 'react';
import { Product, CartItem } from '../../types';
import { ProductCard } from '../ProductCard';
// Removed MASTER_PRODUCTS import

interface HomeScreenProps {
  products?: Product[]; // Optional for backward compatibility, but App passes it
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchTerm: string;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  onProductClick: (product: Product) => void;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products = [], // Default to empty if not passed
  activeCategory,
  setActiveCategory,
  searchTerm,
  cart,
  addToCart,
  removeFromCart,
  onProductClick,
  wishlist,
  onToggleWishlist
}) => {
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category.includes(activeCategory);
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm, products]);
  const bestSellers = useMemo(() => products.filter(p => p.isEssential), [products]);
  const categories = ['All', 'Vegetables', 'Fruits', 'Packaged'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Promo Banner Slider - Bold Titles */}
      <div className="px-5 mt-6 overflow-x-auto scrollbar-hide flex gap-4 snap-x snap-mandatory">
        {[1, 2].map(i => (
          <div key={i} className="flex-shrink-0 w-[88vw] md:w-[60vw] h-48 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-[2.5rem] p-8 relative overflow-hidden snap-center shadow-xl shadow-purple-100/20">
            <div className="relative z-10 text-white h-full flex flex-col justify-center">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-2 text-purple-300">New Deal Every Hour</p>
              <h3 className="text-3xl font-black mb-2 leading-tight tracking-tighter">DEAL RUSH</h3>
              <div className="flex items-center gap-3">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/20 uppercase">Flat ₹125 OFF</span>
              </div>
              <button className="mt-6 w-fit bg-white text-indigo-950 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-white/20 active:scale-95 transition-transform">Order Now</button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-0 right-0 p-8 h-full opacity-30 flex items-center">
              <i className="fas fa-bolt text-[120px] text-white rotate-12"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Filters */}
      <div className="px-5 flex gap-3 overflow-x-auto scrollbar-hide">
        <button className="flex-shrink-0 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">Min Rs. 100 OFF</button>
        <button className="flex-shrink-0 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">Fast Delivery</button>
        <button className="flex-shrink-0 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-800 shadow-sm">Top Rated</button>
      </div>

      {/* Category Grid */}
      <div className="px-5">
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] mb-5">Explore Freshness</h2>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="flex-shrink-0 flex flex-col items-center gap-3 group"
            >
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-300 ${activeCategory === cat ? 'bg-emerald-600 shadow-2xl shadow-emerald-200 text-white scale-110' : 'bg-white border border-slate-100 text-slate-400 hover:text-emerald-500 hover:border-emerald-100 shadow-sm'}`}>
                <i className={`fas ${['fa-house', 'fa-carrot', 'fa-lemon', 'fa-cubes'][idx]} text-2xl`}></i>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${activeCategory === cat ? 'text-emerald-700' : 'text-slate-400 group-hover:text-slate-600'}`}>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bestsellers Section */}
      {activeCategory === 'All' && !searchTerm && (
        <div className="px-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">Daily Essentials</h2>
            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b-2 border-emerald-600">See All</button>
          </div>
          <div className="flex overflow-x-auto scrollbar-hide snap-x">
            {bestSellers.map(p => (

              <ProductCard
                key={p.id}
                product={p}
                cartQuantity={cart.find(i => i.id === p.id)?.quantity || 0}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onClick={() => onProductClick && onProductClick(p)}
                horizontal
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Product Grid */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em]">{activeCategory} Collection</h2>
          <span className="bg-slate-200 text-slate-600 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">{filteredProducts.length} items</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              cartQuantity={cart.find(i => i.id === p.id)?.quantity || 0}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onClick={() => onProductClick && onProductClick(p)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
