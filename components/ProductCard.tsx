import React, { useState } from 'react';
import { Product, Unit } from '../types.ts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product, u: Unit) => void;
  onRemoveFromCart: (productId: number, unitName: string) => void;
  getQuantity: (productId: number, unitName: string) => number;
  onProductClick: (p: Product) => void;
  isWishlisted: boolean;
  onWishlistToggle: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onRemoveFromCart,
  getQuantity,
  onProductClick,
  isWishlisted,
  onWishlistToggle
}) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(product.units[0]);
  const qty = getQuantity(product.id, selectedUnit.name);

  return (
    <div className="bg-white rounded-[2rem] p-4 flex flex-col relative group animate-popIn shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100/50 card-hover">
      {/* Badge & Wishlist */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-sm border border-slate-100">
          <div className={`w-2 h-2 rounded-full ${product.category === 'Vegetables' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className="text-[10px] font-extrabold text-slate-700 tracking-tight uppercase">{product.category === 'Vegetables' ? 'Veg' : 'Organic'}</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onWishlistToggle(product.id); }}
        className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all active-pop ${isWishlisted ? 'bg-rose-50 text-rose-500 shadow-rose-100' : 'bg-white/80 text-slate-400'} shadow-lg backdrop-blur-sm`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative aspect-square mb-4 cursor-pointer overflow-hidden rounded-[1.5rem]" onClick={() => onProductClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out p-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="flex text-amber-400">
            <i className="fa-solid fa-star text-[10px]"></i>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{product.rating} • 15 MIN</span>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 leading-tight mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Unit Selector */}
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar py-1">
          {product.units.map((unit) => (
            <button
              key={unit.name}
              onClick={(e) => { e.stopPropagation(); setSelectedUnit(unit); }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border-2 ${selectedUnit.name === unit.name
                  ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
                  : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-emerald-200'
                }`}
            >
              {unit.name}
            </button>
          ))}
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-bold line-through">₹{selectedUnit.price + 10}</span>
            <span className="text-lg font-black text-slate-900 leading-none">₹{selectedUnit.price}</span>
          </div>

          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedUnit); }}
              className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-200 hover:bg-emerald-600 active-pop transition-all"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-200 overflow-hidden">
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveFromCart(product.id, selectedUnit.name); }}
                className="w-10 h-11 flex items-center justify-center text-white active:bg-emerald-600 transition-colors"
              >
                <i className="fa-solid fa-minus text-[10px]"></i>
              </button>
              <span className="w-6 text-center text-sm font-black text-white">{qty}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedUnit); }}
                className="w-10 h-11 flex items-center justify-center text-white active:bg-emerald-600 transition-colors"
              >
                <i className="fa-solid fa-plus text-[10px]"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
