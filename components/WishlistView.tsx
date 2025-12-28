import React from 'react';
import { Product, Unit, CartItem } from '../types.ts';
import ProductCard from './ProductCard.tsx';

interface WishlistViewProps {
  onBack: () => void;
  wishlistItems: Product[];
  onProductClick: (p: Product) => void;
  onAddToCart: (p: Product, u: Unit) => void;
  onRemoveFromCart: (productId: string, unitName: string) => void;
  getQuantity: (productId: string, unitName: string) => number;
  wishlist: string[];
  onWishlistToggle: (id: string) => void;
}

const WishlistView: React.FC<WishlistViewProps> = ({
  onBack,
  wishlistItems,
  onProductClick,
  onAddToCart,
  onRemoveFromCart,
  getQuantity,
  wishlist,
  onWishlistToggle
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 animate-fadeIn min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl px-6 py-8 flex items-center gap-4 sticky top-0 z-20 border-b border-slate-100">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center active-pop transition-all">
          <i className="fa-solid fa-chevron-left text-slate-900"></i>
        </button>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Favorites</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-24">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fadeIn">
            <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center mb-6 text-rose-200">
              <i className="fa-solid fa-heart-crack text-4xl"></i>
            </div>
            <p className="text-slate-400 font-extrabold text-lg">No favorites yet</p>
            <p className="text-slate-400 text-sm mt-1 max-w-[200px]">Save items you love and they will appear here!</p>
            <button
              onClick={onBack}
              className="mt-8 bg-emerald-500 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-100 active-pop transition-all"
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5">
            {wishlistItems.map((p, idx) => (
              <ProductCard
                key={p.id}
                product={p}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                getQuantity={getQuantity}
                isWishlisted={wishlist.includes(p.id)}
                onWishlistToggle={onWishlistToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistView;
