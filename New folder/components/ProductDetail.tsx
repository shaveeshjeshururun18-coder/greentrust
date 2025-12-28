
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
  const [showDetails, setShowDetails] = useState(false);

  const cartItem = cart.find(c => c.id === product.id && c.selectedUnit.id === selectedUnit.id);
  const quantity = cartItem?.cartQuantity || 0;

  const similarProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="flex flex-col h-full bg-white animate-fadeIn pb-32">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute top-4 left-0 right-0 z-30 px-4 flex justify-between items-center">
          <button onClick={onBack} className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Image with dynamic background */}
        <div className="relative w-full aspect-square bg-[#f8e367] flex items-center justify-center overflow-hidden">
          {/* Stylized background text as in screenshot */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center text-white font-black opacity-60">
            <p className="text-sm tracking-[0.3em] uppercase">The</p>
            <h2 className="text-6xl leading-none">FUTURE</h2>
            <p className="text-xs tracking-widest uppercase">Of Chips</p>
          </div>
          
          <img 
            src={product.image} 
            alt={product.nameEn} 
            className="relative z-10 w-[80%] h-[80%] object-contain drop-shadow-2xl animate-pulse-slow" 
          />
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-white/80 font-black">
            <p className="text-lg">60% POPPED</p>
            <p className="text-[10px] tracking-widest uppercase">Less Fat Technology</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-4">
        {/* Rating & Delivery Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-black text-gray-800">{product.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-bold">({product.ratingCount})</span>
          </div>
        </div>

        {/* Title */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 leading-tight">
              {product.brandEn && <span className="uppercase text-gray-800 mr-2">{product.brandEn}</span>}
              {product.nameEn} +
            </h1>
            <h2 className="text-sm font-bold text-gray-400 mt-1">{product.brandTa} {product.nameTa}</h2>
          </div>
          <div className="w-6 h-6 border border-green-600 rounded-sm p-1 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-600"></div>
          </div>
        </div>

        {/* Select Unit Section */}
        <div className="pt-2">
          <h3 className="text-lg font-black text-gray-800 mb-4">Select Unit</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {product.units.map((unit) => (
              <div 
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className={`flex-shrink-0 w-36 rounded-2xl p-4 border-2 transition-all cursor-pointer ${selectedUnit.id === unit.id ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 bg-white'}`}
              >
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-md">
                  {unit.discount}
                </span>
                <div className="mt-3">
                  <p className="text-lg font-black text-gray-800 leading-none">{unit.weight}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-base font-black text-gray-900">₹{unit.price}</span>
                    <span className="text-[11px] text-gray-400 line-through">MRP ₹{unit.mrp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Accordion */}
        <div className="border-t border-gray-100 py-4">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="w-full flex justify-between items-center text-green-700 font-black"
          >
            <span>View product details</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showDetails ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          {showDetails && (
            <div className="mt-4 text-sm text-gray-600 leading-relaxed font-medium animate-fadeIn">
              <p className="mb-4">{product.descriptionEn}</p>
              <h4 className="font-black text-gray-800 mb-2">Highlights</h4>
              <ul className="list-disc list-inside space-y-1 ml-1">
                {product.highlightsEn?.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Brand Banner */}
        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between border border-gray-100">
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xs rounded-xl shadow-lg">
               4700<br/>BC
             </div>
             <div>
               <h4 className="font-black text-gray-800 text-lg">{product.brandEn}</h4>
               <p className="text-xs text-gray-400 font-bold">Explore all products</p>
             </div>
           </div>
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
           </svg>
        </div>

        {/* Similar Products */}
        <div className="pt-6">
          <h3 className="text-xl font-black text-gray-800 mb-4">Similar products</h3>
          <div className="grid grid-cols-2 gap-4">
            {similarProducts.map(p => (
              <ProductCard 
                key={p.id}
                product={p}
                onClick={() => onSimilarProductClick(p)}
                addToCart={() => addToCart(p, p.units[0])}
                removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                quantity={cart.find(c => c.id === p.id)?.cartQuantity || 0}
                isFavorite={false}
                toggleFavorite={() => {}}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 max-w-md mx-auto z-40">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold line-through">MRP ₹{selectedUnit.mrp}</span>
            <span className="text-2xl font-black text-gray-900">₹{selectedUnit.price}</span>
          </div>
          
          {quantity > 0 ? (
            <div className="flex-1 flex items-center justify-between bg-green-600 text-white rounded-2xl p-1 shadow-xl">
              <button onClick={() => removeFromCart(product.id, selectedUnit.id)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                </svg>
              </button>
              <span className="text-lg font-black">{quantity}</span>
              <button onClick={() => addToCart(product, selectedUnit)} className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
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
    </div>
  );
};

export default ProductDetail;
