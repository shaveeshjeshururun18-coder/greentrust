
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
    <div className="bg-white rounded-[2rem] border border-gray-50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative group animate-popIn">
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.units.length > 1 && (
          <div className="bg-blue-600 text-white text-[7px] px-2 py-1 rounded-full font-black shadow-lg shadow-blue-200 uppercase tracking-widest">
            Variant
          </div>
        )}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); toggleFavorite(); }}
        className={`absolute top-3 right-3 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg transition-all active-pop ${isFavorite ? 'scale-110 shadow-red-100' : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>

      <div className="relative cursor-pointer overflow-hidden p-3" onClick={onClick}>
        <div className="aspect-square bg-gray-50/50 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100/50 transition-colors">
          {/* Animated Background Shimmer on Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          
          <img 
            src={product.image} 
            alt={product.nameEn} 
            className="w-full h-full object-contain mix-blend-multiply transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 drop-shadow-sm" 
          />
        </div>
        
        {/* ADD Button Floating */}
        <div className="absolute bottom-5 right-5 z-20">
          {quantity > 0 ? (
            <div className="flex items-center bg-green-600 rounded-2xl text-white font-black h-9 shadow-xl shadow-green-100 animate-popIn">
              <button onClick={(e) => { e.stopPropagation(); removeFromCart(); }} className="px-3 h-full flex items-center justify-center hover:bg-green-700 transition-colors rounded-l-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-2 text-xs tabular-nums">{quantity}</span>
              <button onClick={(e) => { e.stopPropagation(); addToCart(); }} className="px-3 h-full flex items-center justify-center hover:bg-green-700 transition-colors rounded-r-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ) : (
            <button 
              onClick={(e) => { e.stopPropagation(); addToCart(); }}
              className="bg-white border border-gray-100 text-green-600 font-black px-4 py-2 rounded-2xl text-[11px] shadow-2xl transition-all active-pop hover:bg-green-600 hover:text-white flex flex-col items-center uppercase tracking-widest"
            >
              <span>ADD</span>
              {product.units.length > 1 && <span className="text-[7px] opacity-60 font-medium">Variants</span>}
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-5 flex-1 flex flex-col">
        <div className="cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[9px] text-green-600 font-black bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-widest">{defaultUnit.weight}</span>
            <div className="flex text-yellow-400 scale-75 origin-left">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span className="text-[10px] text-gray-400 font-bold ml-1">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-xs font-black text-gray-800 line-clamp-2 leading-snug h-9 mb-1 group-hover:text-green-600 transition-colors">
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
        
        <div className="mt-auto flex items-end justify-between">
          <div>
            <div className="text-[10px] text-blue-600 font-black mb-0.5 uppercase tracking-tighter">
              {defaultUnit.discount}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-gray-900">₹{defaultUnit.price}</span>
              <span className="text-[10px] text-gray-300 font-bold line-through">₹{defaultUnit.mrp}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
