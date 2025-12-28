import React, { useState } from 'react';
import { Product, Unit, CartItem } from '../types.ts';
import ProductCard from './ProductCard.tsx';
import { PRODUCTS } from '../constants.tsx';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (p: Product, u: Unit) => void;
  onRemoveFromCart: (productId: string, unitName: string) => void;
  getQuantity: (productId: string, unitName: string) => number;
  isWishlisted: boolean;
  onWishlistToggle: (productId: string) => void;
  onSimilarProductClick: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  onAddToCart,
  onRemoveFromCart,
  getQuantity,
  isWishlisted,
  onWishlistToggle,
  onSimilarProductClick
}) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(product.units[0]);
  const qty = getQuantity(product.id, selectedUnit.name);

  // Filter similar products
  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 overflow-y-auto no-scrollbar pb-10">
      {/* Header Bar */}
      <div className="sticky top-0 z-10 px-6 py-6 flex justify-between items-center glass">
        <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center active-pop">
          <i className="fa-solid fa-chevron-left text-slate-900"></i>
        </button>
        <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Product Detail</span>
        <button
          onClick={() => onWishlistToggle(product.id)}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl active-pop ${isWishlisted ? 'bg-rose-50 text-rose-500 shadow-rose-100' : 'bg-white text-slate-400'}`}
        >
          <i className={`fa-${isWishlisted ? 'solid' : 'regular'} fa-heart`}></i>
        </button>
      </div>

      {/* Main Content */}
      <div className="px-6 space-y-8">
        {/* Image Display */}
        <div className="relative aspect-square bg-white rounded-[4rem] p-10 shadow-2xl shadow-slate-100 animate-popIn">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain drop-shadow-2xl" />
        </div>

        {/* Info Area */}
        <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-100 space-y-6 animate-popIn stagger-1">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">{product.category}</span>
              <div className="flex text-amber-400">
                <i className="fa-solid fa-star text-xs"></i>
                <span className="text-[10px] font-black text-slate-400 ml-1.5 uppercase tracking-tighter">{product.rating} • Organic Verified</span>
              </div>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{product.name}</h1>
            <p className="text-slate-400 font-medium leading-relaxed">{product.descriptionEn || 'Premium organic quality, selected for the Green Trust marketplace.'}</p>
          </div>

          {/* Unit Selector */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Options</h4>
            <div className="flex flex-wrap gap-4">
              {product.units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`flex-1 min-w-[120px] p-4 rounded-[1.5rem] border-2 transition-all active-pop ${selectedUnit.name === unit.name
                      ? 'border-emerald-500 bg-emerald-50 shadow-emerald-50'
                      : 'border-slate-100 bg-slate-50'
                    }`}
                >
                  <p className={`text-xs font-black mb-1 ${selectedUnit.name === unit.name ? 'text-emerald-700' : 'text-slate-900'}`}>{unit.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900">₹{unit.price}</span>
                    <span className="text-[10px] text-slate-300 font-bold line-through">₹{unit.mrp}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4">
            {qty === 0 ? (
              <button
                onClick={() => onAddToCart(product, selectedUnit)}
                className="w-full bg-emerald-500 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-100 hover:bg-emerald-600 active-pop transition-all flex items-center justify-center gap-3"
              >
                <i className="fa-solid fa-cart-shopping"></i>
                Add to Bag • ₹{selectedUnit.price}
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex-1 flex items-center justify-between bg-slate-100 p-2 rounded-[2rem] border-2 border-slate-200">
                  <button
                    onClick={() => onRemoveFromCart(product.id, selectedUnit.name)}
                    className="w-14 h-14 bg-white rounded-[1.25rem] shadow-sm flex items-center justify-center text-slate-900 active-pop"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="text-xl font-black text-slate-900">{qty}</span>
                  <button
                    onClick={() => onAddToCart(product, selectedUnit)}
                    className="w-14 h-14 bg-white rounded-[1.25rem] shadow-sm flex items-center justify-center text-slate-900 active-pop"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="space-y-6 pb-12 animate-popIn stagger-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">You Might Also Like</h3>
            <div className="grid grid-cols-2 gap-5">
              {similarProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onProductClick={onSimilarProductClick}
                  onAddToCart={onAddToCart}
                  onRemoveFromCart={onRemoveFromCart}
                  getQuantity={getQuantity}
                  isWishlisted={isWishlisted}
                  onWishlistToggle={onWishlistToggle}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
