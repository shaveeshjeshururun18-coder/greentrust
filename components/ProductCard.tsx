
import React from 'react';
import { Product } from '../types';
import SparkleButton from './SparkleButton';


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
    <div className="flex flex-col gap-2 h-full animate-popIn group relative min-h-[280px]">
      {/* Image Area with Overlay Button */}
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-800/50 rounded-xl overflow-hidden cursor-pointer" onClick={onClick}>
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 left-0 bg-[#5d8ed5] text-white text-[9px] font-black px-1.5 py-1 rounded-br-lg z-10 shadow-sm uppercase tracking-tighter">
            {Math.round(((defaultUnit.mrp - defaultUnit.price) / defaultUnit.mrp) * 100)}% OFF
          </div>
        )}

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          className={`absolute top-2 right-2 z-20 w-7 h-7 flex items-center justify-center rounded-full transition-all ${isFavorite ? 'text-red-500' : 'text-slate-400 bg-white/50'}`}
        >
          {isFavorite ? <i className="fa-solid fa-heart text-sm animate-heartBeat"></i> : <i className="fa-regular fa-heart text-sm"></i>}
        </button>

        {/* Share Button (New - Bottom Left) */}
        <button

          onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();

            const shareData = {
              title: product.nameEn,
              text: `Check out ${product.nameEn} on Green Trust!`,
              url: window.location.href,
            };

            // Try Native Share
            if (navigator.share) {
              try {
                await navigator.share(shareData);
              } catch (err) {
                console.log('Share dismissed or failed', err);
              }
            } else {
              // Fallback to Clipboard
              try {
                await navigator.clipboard.writeText(shareData.url);
                alert("Link copied to clipboard!");
              } catch (err) {
                console.error('Clipboard failed', err);
                alert("Could not copy link. Please manually copy the URL.");
              }
            }
          }}
          className="absolute bottom-2 left-2 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm text-slate-500 hover:bg-green-100 hover:text-green-600 transition-all active:scale-95 shadow-sm border border-white/50"
        >
          <i className="fa-solid fa-share-nodes text-[12px]"></i>
        </button>

        <img
          src={product.image}
          alt={product.nameEn}
          className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500 p-3"
        />

        {/* ADD Button Overlay (Bottom Right) */}
        <div className="absolute bottom-2 right-2 z-20">
          {quantity === 0 ? (
            <SparkleButton
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="bg-white text-green-700 border border-green-600 font-bold text-[10px] px-4 py-1.5 rounded-lg shadow-sm hover:bg-green-50 active:scale-95 transition-all uppercase tracking-wide relative overflow-visible"
            >
              ADD
            </SparkleButton>
          ) : (
            <div className="flex items-center bg-green-600 text-white rounded-lg shadow-md px-1 h-7 min-w-[70px] justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart();
                }}
                className="w-6 h-full flex items-center justify-center active:bg-green-700"
              >
                <i className="fa-solid fa-minus text-[8px]"></i>
              </button>
              <span className="text-[10px] font-black">{quantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart();
                }}
                className="w-6 h-full flex items-center justify-center active:bg-green-700"
              >
                <i className="fa-solid fa-plus text-[8px]"></i>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="px-1 flex flex-col gap-0.5" onClick={onClick}>
        {/* Weight Pill */}
        <div className="w-fit bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded-[4px] mb-1">
          {defaultUnit.weight}
        </div>

        <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 h-9">
          {product.nameEn}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-black text-slate-900 dark:text-white">₹{defaultUnit.price}</span>
          <span className="text-[10px] text-slate-400 line-through">₹{defaultUnit.mrp}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
