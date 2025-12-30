
import React from 'react';
import { Product } from '../types';


interface ProductCardProps {
  product: Product;
  onClick: () => void;
  addToCart: () => void;
  removeFromCart: () => void;
  quantity: number;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  addToCart,
  removeFromCart,
  quantity,
  isFavorite,
  toggleFavorite
}) => {
  const defaultUnit = product.units[0];

  return (
    <div className="h-full bg-white dark:bg-slate-800 rounded-[2rem] border border-gray-50 dark:border-slate-700 shadow-[0_10px_30px_rgba(0,0,0,0.03)] dark:shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative group animate-popIn">
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.units.length > 1 && (
          <div className="bg-blue-600 text-white text-[7px] px-2 py-1 rounded-full font-black shadow-lg shadow-blue-200 uppercase tracking-widest">
            Variant
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`absolute top-3 right-3 z-20 p-2 bg-white/80 dark:bg-slate-700/80 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 ${isFavorite ? 'scale-110 shadow-red-100 dark:shadow-none bg-red-50 dark:bg-red-900/10' : 'hover:scale-110 active:scale-95'}`}
      >
        <div className={`${isFavorite ? 'animate-heartBeat' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      <div className="relative cursor-pointer overflow-hidden p-3" onClick={onClick}>
        <div className="h-48 bg-gray-50/50 dark:bg-white rounded-2xl p-2 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100/50 dark:group-hover:bg-gray-100 transition-colors">
          {/* Animated Background Shimmer on Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

          <img
            src={product.image}
            alt={`Fresh Organic ${product.nameEn} available at Green Trust Chennai`}
            className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 drop-shadow-sm"
          />
        </div>

        {/* Floating buttons removed */}
      </div>

      <div className="px-4 pb-5 flex-1 flex flex-col">
        <div className="cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] text-green-600 font-black bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full uppercase tracking-widest">{defaultUnit.weight}</span>
            <div className="flex text-yellow-400 scale-75 origin-left">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              <span className="text-[10px] text-gray-400 font-bold ml-1">{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs font-black text-gray-800 dark:text-slate-200 line-clamp-2 leading-snug h-9 mb-1 group-hover:text-green-600 transition-colors">
            {product.brandEn && <span className="text-gray-400 mr-1">{product.brandEn}</span>}
            {product.nameEn}
          </h3>

          <div className="flex items-center gap-1 text-[9px] text-gray-400 font-black mb-3 italic">
            <svg className="w-3 h-3 text-green-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {product.deliveryTime}
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-1">
          <div>
            <div className="text-[10px] text-blue-600 font-black mb-0.5 uppercase tracking-tighter">
              {defaultUnit.discount}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900 dark:text-white">₹{defaultUnit.price}</span>
              <span className="text-[10px] text-gray-300 font-bold line-through">₹{defaultUnit.mrp}</span>
            </div>
          </div>

          <div className="flex items-end z-10 w-[70px] h-[30px] justify-end">
            {quantity === 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart();
                }}
                className="w-full h-full bg-slate-50 dark:bg-slate-700 hover:bg-green-50 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg text-xs font-black shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1 uppercase tracking-tight"
              >
                ADD <i className="fa-solid fa-plus text-[10px]"></i>
              </button>
            ) : (
              <div className="w-full h-full flex items-center justify-between bg-green-600 text-white rounded-lg shadow-md overlow-hidden px-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCart();
                  }}
                  className="w-5 h-full flex items-center justify-center active:scale-75 transition-transform"
                >
                  <i className="fa-solid fa-minus text-[9px]"></i>
                </button>
                <span className="text-xs font-black min-w-[14px] text-center">{quantity}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart();
                  }}
                  className="w-5 h-full flex items-center justify-center active:scale-75 transition-transform"
                >
                  <i className="fa-solid fa-plus text-[9px]"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
