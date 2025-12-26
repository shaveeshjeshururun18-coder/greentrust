import React, { useState } from 'react';
import { Product } from '../../types';
import { MASTER_PRODUCTS } from '../../constants';
import { ProductCard } from '../ProductCard';

interface ProductDetailsScreenProps {
    product: Product;
    onBack: () => void;
    onAddToCart: (product: Product) => void;
    cartQuantity: number;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ product, onBack, onAddToCart, cartQuantity }) => {
    const relatedProducts = MASTER_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);
    const [pincode, setPincode] = useState('');
    const [checkStatus, setCheckStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');

    const handleCheckPincode = (e: React.FormEvent) => {
        e.preventDefault();
        if (pincode.length !== 6) return;

        setCheckStatus('checking');
        setTimeout(() => {
            // Mock logic: 600xxx are available
            if (pincode.startsWith('600')) {
                setCheckStatus('available');
            } else {
                setCheckStatus('unavailable');
            }
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 overflow-y-auto animate-in slide-in-from-right duration-300 pb-32">
            {/* Hero Image Header */}
            <div className="relative h-[45vh] bg-slate-100 dark:bg-slate-800">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} />

                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-slate-900 border border-white/20 shadow-lg active:scale-90 transition-transform z-10"
                >
                    <i className="fas fa-arrow-left"></i>
                </button>

                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="px-6 -mt-8 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight w-2/3">{product.name}</h1>
                    <div className="text-right">
                        <p className="text-2xl font-black text-emerald-600">₹{product.price}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">per {product.unit}</p>
                    </div>
                </div>

                {/* Mock Weight Selector (Visual Only) */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
                    {['250g', '500g', '1kg'].map((w, idx) => (
                        <button key={w} className={`px-4 py-2 rounded-xl text-xs font-bold border ${idx === 1 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent text-slate-400 border-slate-200 dark:border-slate-700'}`}>
                            {w}
                        </button>
                    ))}
                    <button className="px-4 py-2 rounded-xl text-xs font-bold border border-dashed border-emerald-400 text-emerald-600">
                        Custom
                    </button>
                </div>

                {product.tamilName && (
                    <p className="text-xl text-emerald-600 dark:text-emerald-400 font-bold mb-6 font-sans">{product.tamilName}</p>
                )}

                <div className="space-y-8">
                    {/* Pincode Check */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Check Delivery</h3>
                        <form onSubmit={handleCheckPincode} className="relative flex items-center">
                            <i className="fas fa-map-pin absolute left-4 text-emerald-500"></i>
                            <input
                                type="text"
                                placeholder="Enter Pincode (e.g. 600001)"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-3 pl-10 pr-24 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/20"
                            />
                            <button
                                type="submit"
                                disabled={pincode.length !== 6 || checkStatus === 'checking'}
                                className="absolute right-1 top-1 bottom-1 bg-emerald-600 text-white px-4 rounded-xl text-xs font-black uppercase tracking-wider disabled:opacity-50"
                            >
                                {checkStatus === 'checking' ? <i className="fas fa-circle-notch fa-spin"></i> : 'Check'}
                            </button>
                        </form>

                        {checkStatus === 'available' && (
                            <div className="mt-3 flex items-start gap-3 animate-in slide-in-from-top-2">
                                <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 shrink-0">
                                    <i className="fas fa-check text-xs"></i>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Delivery Available!</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Get it by <span className="font-bold">Tomorrow, 6 PM</span></p>
                                </div>
                            </div>
                        )}

                        {checkStatus === 'unavailable' && (
                            <div className="mt-3 flex items-start gap-3 animate-in slide-in-from-top-2">
                                <div className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 shrink-0">
                                    <i className="fas fa-times text-xs"></i>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-rose-700 dark:text-rose-400">Not available at this location</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">We are expanding soon!</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Freshness Guarantee</h3>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                            Hand-picked from certified local farms. Delivered within 24 hours of harvest to ensure maximum nutrition and taste.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <div className="bg-white dark:bg-slate-700 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100 dark:border-slate-600">
                                <i className="fas fa-certificate text-emerald-500"></i>
                                <span className="text-[10px] font-bold uppercase tracking-wider dark:text-white">Organic</span>
                            </div>
                            <div className="bg-white dark:bg-slate-700 px-3 py-2 rounded-xl flex items-center gap-2 border border-slate-100 dark:border-slate-600">
                                <i className="fas fa-clock text-orange-500"></i>
                                <span className="text-[10px] font-bold uppercase tracking-wider dark:text-white">Same Day</span>
                            </div>
                        </div>
                    </div>

                    {/* Nutrition (Mock) */}
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2">Nutrition Facts (100g)</h3>
                        <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {[
                                { l: 'Calories', v: '45' },
                                { l: 'Protein', v: '2.1g' },
                                { l: 'Carbs', v: '8g' },
                                { l: 'Fat', v: '0.2g' }
                            ].map(n => (
                                <div key={n.l} className="flex-shrink-0 w-20 h-24 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm">
                                    <span className="text-lg font-black text-slate-900 dark:text-white">{n.v}</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{n.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Reviews */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Customer Reviews</h3>
                            <div className="flex items-center gap-1 text-emerald-500">
                                <i className="fas fa-star text-xs"></i>
                                <span className="text-xs font-black">4.8</span>
                                <span className="text-[9px] text-slate-400">(128)</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {[1, 2].map(i => (
                                <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-50 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">Rajesh K.</h4>
                                        <div className="flex text-emerald-400 text-[10px]">
                                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                        </div>
                                    </div>
                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                                        Very fresh {product.name.toLowerCase()}! Delivered quickly and packaging was good. Will order again.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Products */}
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2">You Might Also Like</h3>
                        <div className="flex overflow-x-auto scrollbar-hide gap-4 pb-4">
                            {relatedProducts.map(p => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    cartQuantity={0}
                                    onAddToCart={() => { }}
                                    onRemoveFromCart={() => { }}
                                    horizontal
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-5 safe-bottom z-50">
                <button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-emerald-600 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 dark:shadow-emerald-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                    <i className="fas fa-shopping-basket"></i>
                    {cartQuantity > 0 ? `Add Another (${cartQuantity} in Cart)` : 'Add to Basket'}
                </button>
            </div>
        </div>
    );
};
