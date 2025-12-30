
import React, { useState } from 'react';
import { Product, Unit, CartItem } from '../types';
import { PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  addToCart: (p: Product, unit: Unit) => void;
  removeFromCart: (pId: string, unitId: string) => void;
  cart: CartItem[];
  isFavorite: boolean;
  toggleFavorite: () => void;
  onSimilarProductClick: (p: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onBack,
  addToCart,
  removeFromCart,
  cart,
  isFavorite,
  toggleFavorite,
  onSimilarProductClick
}) => {
  const [selectedUnit, setSelectedUnit] = useState<Unit>(product.units[0]);
  const [showDetails, setShowDetails] = useState(true);

  const cartItem = cart.find(c => c.id === product.id && c.selectedUnit.id === selectedUnit.id);
  const quantity = cartItem?.cartQuantity || 0;

  const similarProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  // Helper to handle Quantity Change
  const handleQuantityChange = (delta: number) => {
    if (delta > 0) {
      addToCart(product, selectedUnit);
    } else {
      removeFromCart(product.id, selectedUnit.id);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 animate-fadeIn pb-32 md:pb-0">

      {/* Mobile Top Bar */}
      <div className="md:hidden relative">
        <div className="absolute top-4 left-0 right-0 z-30 px-4 flex justify-between items-center">
          <button onClick={onBack} className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
            <i className="fa-solid fa-arrow-left text-slate-800 dark:text-white"></i>
          </button>
          <div className="flex gap-2">
            <button onClick={toggleFavorite} className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
              <i className={`${isFavorite ? 'fa-solid text-red-500' : 'fa-regular text-slate-800 dark:text-white'} fa-heart`}></i>
            </button>
            <button className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
              <i className="fa-solid fa-share-nodes text-slate-800 dark:text-white"></i>
            </button>
          </div>
        </div>

        {/* Mobile Product Image */}
        <div className="relative w-full aspect-square bg-[#f8e367] flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.nameEn}
            className="relative z-10 w-[80%] h-[80%] object-contain drop-shadow-2xl animate-pulse-slow"
          />
        </div>
      </div>

      <div className="md:max-w-7xl md:mx-auto md:p-8 w-full">
        {/* Desktop Breadcrumbs & Back */}
        <div className="hidden md:flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
          <button onClick={onBack} className="hover:text-green-600 flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
          <span>/</span>
          <span className="hover:text-green-600 cursor-pointer">Home</span>
          <span>/</span>
          <span className="hover:text-green-600 cursor-pointer">{product.category}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">{product.nameEn}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Desktop Image Gallery */}
          <div className="hidden md:flex flex-col gap-4">
            <div className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] flex items-center justify-center p-10 border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
              {/* Decorative Blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -translate-y-20 translate-x-20"></div>
              <img
                src={product.image}
                alt={product.nameEn}
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-6 right-6">
                <button onClick={toggleFavorite} className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                  <i className={`${isFavorite ? 'fa-solid text-red-500' : 'fa-regular text-slate-400'} fa-heart text-xl`}></i>
                </button>
              </div>
            </div>
            {/* Thumbnails (Mocked since we have 1 image) */}
            <div className="flex gap-4">
              {[product.image, product.image].map((img, idx) => (
                <div key={idx} className={`w-24 h-24 rounded-2xl border-2 ${idx === 0 ? 'border-green-600' : 'border-transparent'} p-2 cursor-pointer bg-slate-50 dark:bg-slate-900`}>
                  <img src={img} className="w-full h-full object-contain" alt="thumb" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info - Desktop & Mobile Content */}
          <div className="px-5 pt-6 md:px-0 md:pt-0 space-y-6">

            {/* Title & Brand */}
            <div>
              {product.brandEn && (
                <span className="text-xs font-black text-green-600 uppercase tracking-widest bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-md mb-3 inline-block">
                  {product.brandEn}
                </span>
              )}
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                {product.nameEn}
              </h1>
              <h2 className="text-lg font-bold text-slate-400">{product.brandTa} {product.nameTa}</h2>
            </div>

            {/* Ratings & Status */}
            <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-500 text-lg">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-slate-200 dark:text-slate-800'}`}></i>
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-500 ml-2">{product.ratingCount} reviews</span>
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700"></div>
              <span className="text-green-600 font-bold text-sm bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <i className="fa-solid fa-check mr-2"></i>In Stock
              </span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">₹{selectedUnit.price}</span>
              <div className="flex flex-col mb-2">
                <span className="text-lg text-slate-400 font-bold line-through">₹{selectedUnit.mrp}</span>
                <span className="text-xs text-red-500 font-black uppercase tracking-wider">{selectedUnit.discount} OFF</span>
              </div>
            </div>

            {/* Unit Selector */}
            <div>
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Select Pack Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.units.map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit)}
                    className={`px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all ${selectedUnit.id === unit.id
                      ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-green-400'}`}
                  >
                    {unit.weight} - ₹{unit.price}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-slate dark:prose-invert text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              <p>{product.descriptionEn}</p>

              <div className="mt-4">
                <h4 className="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">Highlights</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {product.highlightsEn?.map((h, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <i className="fa-solid fa-check text-green-500 text-xs"></i>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:block pt-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-slate-200 dark:border-slate-800 rounded-2xl h-14 bg-white dark:bg-slate-900">
                  <button onClick={() => handleQuantityChange(quantity - 1)} className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-green-600 text-lg">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="w-12 text-center text-xl font-black text-slate-900 dark:text-white">{quantity}</span>
                  <button onClick={() => handleQuantityChange(quantity + 1)} className="w-14 h-full flex items-center justify-center text-slate-500 hover:text-green-600 text-lg">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <button
                  onClick={() => addToCart(product, selectedUnit)}
                  className="flex-1 h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
                >
                  Add to Cart
                </button>
              </div>

              {/* Quick Checkout Options */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Checkout</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => { addToCart(product, selectedUnit); }}
                    className="h-14 bg-[#5f259f] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <img src="/assets/phonepe-new.png" alt="PhonePe" className="h-8 object-contain brightness-0 invert" />
                    <span className="hidden lg:inline">PhonePe</span>
                  </button>
                  <button
                    onClick={() => { addToCart(product, selectedUnit); }}
                    className="h-14 bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <img src="/assets/gpay-new.png" alt="GPay" className="h-8 object-contain" />
                    <span className="hidden lg:inline">Google Pay</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="md:hidden h-24"></div> {/* Spacer for mobile sticky bar */}
          </div>
        </div>

        {/* Mobile Sticky Bar (Preserved) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 max-w-md mx-auto z-40">
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 font-bold line-through">MRP ₹{selectedUnit.mrp}</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white">₹{selectedUnit.price}</span>
            </div>

            {quantity > 0 ? (
              <div className="flex-1 flex items-center justify-between bg-green-600 text-white rounded-2xl p-1 shadow-xl">
                <button onClick={() => removeFromCart(product.id, selectedUnit.id)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors">
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="text-lg font-black">{quantity}</span>
                <button onClick={() => addToCart(product, selectedUnit)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors">
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, selectedUnit)}
                className="flex-1 bg-green-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-100 transition-all active:scale-95 flex flex-col items-center leading-none"
              >
                <span>ADD</span>
                <span className="text-[10px] opacity-70 mt-1 uppercase">to cart</span>
              </button>
            )}
          </div>
        </div>

        {/* Similar Products (Customers Also Bought) */}
        <div className="mt-20 px-5 md:px-0">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Customers Also Bought</h3>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg hover:bg-green-700 transition-colors">
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {similarProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => onSimilarProductClick(p)}
                addToCart={() => addToCart(p, p.units[0])}
                removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                quantity={cart.find(c => c.id === p.id)?.cartQuantity || 0}
                isFavorite={false}
                toggleFavorite={() => { }}
              />
            ))}
          </div>
        </div>

        {/* Footer Banner for Desktop */}
        <div className="hidden md:block mt-16 p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 border-dashed">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-xl">
                <i className="fa-solid fa-percent"></i>
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-lg">Biggest New Year Sale Live!</h4>
                <p className="text-sm text-slate-500">Don't miss out on upto 60% OFF.</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
              Shop Sale
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
