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
    <div className="bg-white rounded-2xl p-3 flex flex-col relative group animate-popIn shadow-sm border border-slate-100/60 transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square mb-3 cursor-pointer overflow-hidden rounded-xl bg-slate-50" onClick={() => onProductClick(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-white/90 backdrop-blur-md rounded-md flex items-center gap-1 shadow-sm border border-slate-100">
          <i className="fa-solid fa-clock text-[8px] text-emerald-500"></i>
          <span className="text-[8px] font-black text-slate-700 tracking-tight uppercase">{product.deliveryTime}</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xs font-bold text-slate-800 leading-tight mb-1 line-clamp-2 min-h-[2rem]">
          {product.name}
        </h3>

        <p className="text-[10px] text-slate-400 font-medium mb-3">{selectedUnit.weight}</p>

        {/* Pricing & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-black text-slate-900 leading-none">₹{selectedUnit.price}</span>
            {selectedUnit.mrp > selectedUnit.price && (
              <span className="text-[9px] text-slate-300 font-bold line-through mt-0.5">₹{selectedUnit.mrp}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedUnit); }}
              className="px-4 py-1.5 bg-white text-emerald-600 border border-emerald-500 rounded-lg font-black text-[10px] uppercase tracking-wider active-pop transition-all hover:bg-emerald-50"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-emerald-600 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={(e) => { e.stopPropagation(); onRemoveFromCart(product.id, selectedUnit.name); }}
                className="w-7 h-8 flex items-center justify-center text-white active:bg-emerald-700 transition-colors"
              >
                <i className="fa-solid fa-minus text-[8px]"></i>
              </button>
              <span className="w-4 text-center text-[10px] font-black text-white">{qty}</span>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedUnit); }}
                className="w-7 h-8 flex items-center justify-center text-white active:bg-emerald-700 transition-colors"
              >
                <i className="fa-solid fa-plus text-[8px]"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
