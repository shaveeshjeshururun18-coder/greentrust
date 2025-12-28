import React, { useState, useEffect } from 'react';
import { DETAILED_CATEGORIES } from '../constants.tsx';
import { Product, Unit } from '../types.ts';

interface CategoriesViewProps {
    onBack: () => void;
    onProductClick: (product: Product) => void;
    cart: any[];
    addToCart: (product: Product, unit: Unit) => void;
    removeFromCart: (productId: string, unitId: string) => void;
    toggleWishlist?: (id: string) => void;
    wishlist?: string[];
    getQuantity: (productId: string, unitId: string) => number;
}

const CategoriesView: React.FC<CategoriesViewProps> = ({
    onBack,
    onProductClick,
    addToCart,
    removeFromCart,
    getQuantity,
    wishlist = [],
    toggleWishlist = () => { }
}) => {
    const [activeCategoryId, setActiveCategoryId] = useState(DETAILED_CATEGORIES[0].id);
    const activeCategory = DETAILED_CATEGORIES.find(c => c.id === activeCategoryId) || DETAILED_CATEGORIES[0];

    // Mock product generator for display items
    const createMockProduct = (name: string, categoryName: string): Product => ({
        id: `mock-${name.replace(/\s+/g, '-').toLowerCase()}`,
        nameEn: name,
        nameTa: name,
        image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=300&fit=crop', // Placeholder
        category: categoryName,
        isVeg: true,
        rating: 4.5,
        ratingCount: 100,
        deliveryTime: '15 MINS',
        units: [{ id: 'u1', weight: '500g', price: 40, mrp: 50, discount: '' }],
        descriptionEn: 'Fresh and organic.',
        descriptionTa: ''
    });

    return (
        <div className="flex h-[calc(100vh-80px)] bg-white animate-fadeIn fixed inset-0 top-0 z-40">
            {/* Sidebar */}
            <div className="w-24 flex-shrink-0 bg-slate-50 border-r border-slate-100 flex flex-col h-full py-4 pb-20 overflow-y-auto no-scrollbar">
                <button onClick={onBack} className="mx-auto mb-6 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 active:scale-90 transition-transform">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>

                <div className="space-y-4 flex flex-col items-center">
                    {DETAILED_CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategoryId(cat.id)}
                            className={`flex flex-col items-center gap-1 group relative ${activeCategoryId === cat.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                        >
                            {activeCategoryId === cat.id && (
                                <div className="absolute -right-[17px] top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-l-full"></div>
                            )}
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all ${activeCategoryId === cat.id ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200 shadow-md' : 'bg-white text-slate-400 shadow-sm'}`}>
                                <i className={`fa-solid ${cat.icon}`}></i>
                            </div>
                            <span className="text-[9px] font-bold text-center leading-tight max-w-[60px]">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Content */}
            <div className="flex-1 overflow-y-auto bg-white h-full pb-24">
                <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-50/50 backdrop-blur-sm">
                    <h1 className="text-xl font-black text-slate-900">{activeCategory.name}</h1>
                </div>

                <div className="px-5 py-4 space-y-8">
                    {activeCategory.subcategories.map((sub) => (
                        <div key={sub.id} className="animate-popIn">
                            <h2 className="text-sm font-black text-slate-800 mb-3 flex items-center gap-2">
                                <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
                                {sub.name}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {sub.items.map((itemName) => {
                                    const mockProduct = createMockProduct(itemName, activeCategory.name);
                                    const qty = getQuantity(mockProduct.id, mockProduct.units[0].id);

                                    return (
                                        <div key={itemName} className="bg-white border border-slate-100 rounded-xl p-2.5 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform">
                                            <div className="w-12 h-12 rounded-lg bg-slate-50 flex-shrink-0 overflow-hidden">
                                                <img src={mockProduct.image} className="w-full h-full object-cover opacity-80" alt={itemName} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-800 truncate line-clamp-1">{itemName}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">500g</p>
                                                <div className="flex items-center justify-between mt-1.5">
                                                    <span className="text-xs font-black text-slate-900">₹40</span>

                                                    {qty === 0 ? (
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); addToCart(mockProduct, mockProduct.units[0]); }}
                                                            className="px-3 py-1 bg-white border border-emerald-500 text-emerald-600 rounded-md text-[9px] font-black uppercase shadow-sm"
                                                        >
                                                            ADD
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center bg-emerald-500 rounded-md shadow-md h-6">
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); removeFromCart(mockProduct.id, mockProduct.units[0].id); }}
                                                                className="w-6 h-full flex items-center justify-center text-white"
                                                            >
                                                                <i className="fa-solid fa-minus text-[8px]"></i>
                                                            </button>
                                                            <span className="text-[9px] font-black text-white px-1">{qty}</span>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); addToCart(mockProduct, mockProduct.units[0]); }}
                                                                className="w-6 h-full flex items-center justify-center text-white"
                                                            >
                                                                <i className="fa-solid fa-plus text-[8px]"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesView;
