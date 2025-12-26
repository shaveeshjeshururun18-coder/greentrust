import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (id: string) => void;
  horizontal?: boolean;
  onClick?: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart,
  horizontal,
  onClick,
  isWishlisted,
  onToggleWishlist
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 p-3 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20 transition-all duration-300 ${horizontal ? 'min-w-[160px]' : ''}`}
    >
      <div className="relative mb-3 overflow-hidden rounded-[1.5rem] aspect-square bg-slate-50 dark:bg-slate-700/30">
        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist();
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
          >
            <i className={`${isWishlisted ? 'fas text-rose-500' : 'far text-slate-600'} fa-heart text-sm`}></i>
          </button>
        )}

        {cartQuantity > 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] transition-all">
            <div className="text-white font-black text-2xl">{cartQuantity}</div>
          </div>
        )}
      </div>

      <div className="px-1">
        <div className="flex justify-between items-start mb-1 h-10">
          <div className="flex flex-col">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm leading-tight line-clamp-1">{product.name}</h3>
            {product.tamilName && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-sans tracking-wide mt-0.5">{product.tamilName}</span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{product.unit}</span>
            <span className="text-base font-black text-slate-900 dark:text-white">₹{product.price}</span>
          </div>

          {cartQuantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 transition-colors shadow-sm"
            >
              <i className="fas fa-plus text-xs"></i>
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-emerald-600 rounded-full px-2 py-1 shadow-lg shadow-emerald-200 dark:shadow-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFromCart(product.id);
                }}
                className="w-5 h-5 flex items-center justify-center text-white/80 hover:text-white"
              >
                <i className="fas fa-minus text-[8px]"></i>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(product);
                }}
                className="w-5 h-5 flex items-center justify-center text-white/80 hover:text-white"
              >
                <i className="fas fa-plus text-[8px]"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
