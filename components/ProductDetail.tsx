
import React, { useState } from 'react';
import { Product, Unit, CartItem } from '../types';
import { PRODUCTS, ALL_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';
import SparkleButton from './SparkleButton';

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



  // Better recommendation logic
  const similarProducts = ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, 4);

  const exploreMore = ALL_PRODUCTS
    .filter(p => p.id !== product.id && p.category !== product.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

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
            <button
              onClick={async () => {
                const shareData = {
                  title: product.nameEn,
                  text: `Check out ${product.nameEn} on Green Trust!`,
                  url: window.location.href,
                };
                if (navigator.share) {
                  try {
                    await navigator.share(shareData);
                  } catch (err) {
                    console.log('Share dismissed', err);
                  }
                } else {
                  try {
                    await navigator.clipboard.writeText(shareData.url);
                    alert("Link copied to clipboard!");
                  } catch (err) {
                    alert("Could not copy link.");
                  }
                }
              }}
              className="w-10 h-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
            >
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
            <div className="aspect-square bg-gradient-to-br from-green-50 to-white dark:from-slate-900 dark:to-slate-950 rounded-[3rem] flex items-center justify-center p-12 border border-slate-100 dark:border-slate-800 relative overflow-hidden group shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
              {/* Decorative Animated Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>

              <img
                src={product.image}
                alt={product.nameEn}
                className="w-full h-full object-contain drop-shadow-2xl z-10 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 ease-in-out"
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

            {/* Price & Offer */}
            <div className="flex items-center gap-4 bg-green-50/50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/20">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Price</span>
                <span className="text-5xl font-[#900] md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">₹{selectedUnit.price}</span>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
              <div className="flex flex-col justify-center">
                <span className="text-xl text-slate-400 font-bold line-through decoration-2 decoration-red-300">₹{selectedUnit.mrp}</span>
                <span className="text-xs font-black text-white bg-red-500 px-2 py-1 rounded-md shadow-sm shadow-red-200 animate-pulse-slow">SAVE {selectedUnit.discount}</span>
              </div>
            </div>

            {/* Trust Badges - Card Style */}
            <div className="grid grid-cols-3 gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-rotate-left text-lg"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">48 Hrs</span>
                  <span className="text-[9px] font-bold text-slate-400">Return Policy</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-headset text-lg"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">24/7</span>
                  <span className="text-[9px] font-bold text-slate-400">Support</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center gap-2 group">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-truck-fast text-lg"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Fast</span>
                  <span className="text-[9px] font-bold text-slate-400">Delivery</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {/* Highlights */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden transition-all hover:shadow-md">
                <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between p-5 bg-transparent">
                  <span className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wide">Product Highlights</span>
                  <div className={`w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}>
                    <i className="fa-solid fa-chevron-down text-slate-400 text-xs"></i>
                  </div>
                </button>
                {showDetails && (
                  <div className="px-5 pb-5 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    <ul className="grid grid-cols-1 gap-2">
                      {product.highlightsEn?.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <i className="fa-solid fa-check text-green-500 mt-1"></i>
                          <span>{h}</span>
                        </li>
                      )) || <li>Fresh and high quality</li>}
                    </ul>
                  </div>
                )}
              </div>

              {/* Health Benefits */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-sm text-slate-800 dark:text-white">Health Benefits</span>
                  <i className="fa-solid fa-chevron-down text-slate-400"></i>
                </button>
              </div>

              {/* Serve Size */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-sm text-slate-800 dark:text-white">Serve Size</span>
                  <i className="fa-solid fa-chevron-down text-slate-400"></i>
                </button>
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

                <SparkleButton
                  onClick={() => addToCart(product, selectedUnit)}
                  className="sparkle-add-btn sparkle-btn-lg flex-1 h-14 flex items-center justify-center"
                >
                  Add to Cart
                </SparkleButton>
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
                    className="h-14 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold text-xs uppercase tracking-wider hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
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
              <div className="flex-1 flex items-center justify-between bg-green-600 text-white rounded-2xl p-1 shadow-xl h-14">
                <button onClick={() => removeFromCart(product.id, selectedUnit.id)} className="w-14 h-full flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors active:scale-90">
                  <i className="fa-solid fa-minus text-lg"></i>
                </button>
                <span className="text-xl font-black">{quantity}</span>
                <button onClick={() => addToCart(product, selectedUnit)} className="w-14 h-full flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors active:scale-90">
                  <i className="fa-solid fa-plus text-lg"></i>
                </button>
              </div>
            ) : (
              <SparkleButton
                onClick={() => addToCart(product, selectedUnit)}
                className="sparkle-add-btn sparkle-btn-lg flex-1 py-4 text-lg"
              >
                ADD
              </SparkleButton>
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
      </div>

      {/* Explore More Random Section */}
      <div className="mt-12 px-5 md:px-0">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">You Might Also Like</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {exploreMore.map(p => (
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
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xl">
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

  );
};

export default ProductDetail;
