import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { DETAILED_CATEGORIES, ALL_PRODUCTS } from '../constants.tsx';
import Footer from './Footer.tsx';
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
    searchQuery?: string;
    setSearchQuery?: (query: string) => void;
    initialCategoryId?: string;
    initialFilterOpen?: boolean;
}

const CategoriesView: React.FC<CategoriesViewProps> = ({
    onBack,
    onProductClick,
    addToCart,
    removeFromCart,
    getQuantity,
    wishlist = [],
    toggleWishlist = () => { },
    initialCategoryId = 'all',
    searchQuery = '',
    setSearchQuery,
}) => {
    // Current Active Category (Unified for Mobile & Desktop)
    const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId);
    const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
    const [isSidebarHidden, setIsSidebarHidden] = useState(false);

    // Filter Logic
    const allProductsWithMetadata = useMemo(() => {
        return ALL_PRODUCTS.map(p => {
            const category = DETAILED_CATEGORIES.find(c => c.name === p.category);
            let subCategoryName = '';
            if (category) {
                const sub = category.subcategories.find(s => s.items.includes(p.nameEn));
                if (sub) subCategoryName = sub.name;
            }
            return {
                product: p,
                categoryId: category ? category.id : 'unknown',
                subCategoryName
            };
        });
    }, []);

    const filteredProducts = useMemo(() => {
        return allProductsWithMetadata.filter(({ product: p, categoryId, subCategoryName }) => {
            // Search Filter
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const match = p.nameEn.toLowerCase().includes(q) || (p.nameTa && p.nameTa.toLowerCase().includes(q));
                if (!match) return false;
            }

            // Category Filter
            const categoryMatch = activeCategoryId === 'all' || activeCategoryId === categoryId;

            // Subcategory Filter
            const subCategoryMatch = activeSubCategory === 'all' || subCategoryName === activeSubCategory;

            return categoryMatch && subCategoryMatch;
        });
    }, [allProductsWithMetadata, activeCategoryId, activeSubCategory, searchQuery]);

    const activeCategory = DETAILED_CATEGORIES.find(c => c.id === activeCategoryId) || { name: 'All Products', subcategories: [], id: 'all' };

    const handleCategoryChange = (id: string) => {
        setActiveCategoryId(id);
        setActiveSubCategory('all'); // Reset subcategory when main category changes
    };

    return (
        <div className="h-full bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row relative animate-fadeIn transition-all overflow-hidden">

            {/* --- MOBILE VIEW --- */}
            <div className="md:hidden flex flex-col w-full h-full pb-20">
                {/* Mobile Header */}
                <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800">
                    <div className="px-4 py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button onClick={onBack} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <h2 className="text-lg font-black text-slate-900 dark:text-white truncate max-w-[120px]">
                                {activeCategoryId === 'all' ? 'All Items' : activeCategory.name}
                            </h2>
                        </div>
                        <div className="relative w-40">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-full pl-8 pr-3 text-xs outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i>
                        </div>
                    </div>
                </div>

                {/* Mobile Split Body */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Mobile Left Rail */}
                    <div className="w-20 bg-slate-50 dark:bg-slate-900 overflow-y-auto no-scrollbar border-r border-slate-100 dark:border-slate-800">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`w-full py-4 flex flex-col items-center gap-1 transition-all relative ${activeCategoryId === 'all' ? 'bg-white dark:bg-slate-800' : ''}`}
                        >
                            {activeCategoryId === 'all' && <div className="absolute right-0 top-2 bottom-2 w-1 bg-green-500 rounded-l-full"></div>}
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategoryId === 'all' ? 'bg-green-100 text-green-600 shadow-sm' : 'text-slate-400'}`}>
                                <i className="fa-solid fa-border-all"></i>
                            </div>
                            <span className={`text-[10px] font-black ${activeCategoryId === 'all' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>All</span>
                        </button>
                        {DETAILED_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`w-full py-4 flex flex-col items-center gap-1 transition-all relative ${activeCategoryId === cat.id ? 'bg-white dark:bg-slate-800' : ''}`}
                            >
                                {activeCategoryId === cat.id && <div className="absolute right-0 top-2 bottom-2 w-1 bg-green-500 rounded-l-full"></div>}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center p-1.5 border ${activeCategoryId === cat.id ? 'bg-white border-green-100 shadow-sm' : 'bg-slate-100 border-transparent dark:bg-slate-800'}`}>
                                    <img src={cat.image} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" alt="" />
                                </div>
                                <span className={`text-[10px] font-black truncate w-full px-1 text-center ${activeCategoryId === cat.id ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{cat.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile Content Area */}
                    <div className="flex-1 overflow-y-auto p-3 no-scrollbar pb-24">
                        {/* Mobile Subcategories */}
                        {activeCategoryId !== 'all' && activeCategory.subcategories && activeCategory.subcategories.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
                                <button
                                    onClick={() => setActiveSubCategory('all')}
                                    className={`px-4 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap border-2 transition-all ${activeSubCategory === 'all' ? 'bg-green-600 border-green-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                                >
                                    All
                                </button>
                                {activeCategory.subcategories.map(sub => (
                                    <button
                                        key={sub.name}
                                        onClick={() => setActiveSubCategory(sub.name)}
                                        className={`px-4 py-1.5 rounded-full text-[10px] font-black whitespace-nowrap border-2 transition-all ${activeSubCategory === sub.name ? 'bg-green-600 border-green-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            {filteredProducts.map(({ product: p }) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    onClick={() => onProductClick(p)}
                                    addToCart={() => addToCart(p, p.units[0])}
                                    quantity={getQuantity(p.id, p.units[0].id)}
                                    removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                                    isFavorite={wishlist.includes(p.id)}
                                    toggleFavorite={() => toggleWishlist(p.id)}
                                />
                            ))}
                        </div>
                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                                <i className="fa-solid fa-magnifying-glass text-4xl mb-3"></i>
                                <p className="text-sm font-bold">No items found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden md:flex flex-row flex-1 h-screen overflow-hidden">
                {/* Desktop Sidebar */}
                <div className={`
                    flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                    transition-all duration-300 ease-in-out
                    ${isSidebarHidden ? 'w-0 border-r-0 opacity-0' : 'w-[280px]'}
                    overflow-hidden
                `}>
                    <div className="flex flex-col h-full">
                        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white">Categories</h2>
                            <button
                                onClick={() => setIsSidebarHidden(true)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-transform active:scale-95"
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto no-scrollbar py-4">
                            <button
                                onClick={() => handleCategoryChange('all')}
                                className={`w-full px-6 py-4 flex items-center gap-4 transition-all relative ${activeCategoryId === 'all' ? 'bg-purple-50 text-purple-700' : 'hover:bg-slate-50 text-slate-600 dark:text-slate-400'}`}
                            >
                                {activeCategoryId === 'all' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-600 rounded-r-xl"></div>}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategoryId === 'all' ? 'bg-purple-100' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                    <i className="fa-solid fa-border-all text-lg"></i>
                                </div>
                                <span className="font-bold text-sm">All Products</span>
                            </button>
                            {DETAILED_CATEGORIES.map(cat => {
                                const isActive = activeCategoryId === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`w-full px-6 py-4 flex items-center gap-4 transition-all relative ${isActive ? 'bg-purple-50 text-purple-700' : 'hover:bg-slate-50 text-slate-600 dark:text-slate-400'}`}
                                    >
                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-purple-600 rounded-r-xl"></div>}
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? 'bg-purple-100' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                            <i className={`fa-solid ${cat.icon} text-lg`}></i>
                                        </div>
                                        <span className="font-bold text-sm">{cat.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Desktop Content Area */}
                <div className="flex-1 h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 no-scrollbar pb-20">
                    <div className="p-8 pb-0">
                        {/* Hero Banner Section */}
                        <div className="relative w-full h-72 rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 group">
                            <img
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                alt="Fresh Collection"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-16">
                                <span className="text-purple-400 font-black uppercase tracking-[0.4em] text-[10px] mb-5">Premium Selections</span>
                                <h2 className="text-6xl font-black text-white mb-8 leading-tight">Freshly Picked<br />Daily Harvest</h2>
                                <button className="w-max px-12 py-5 bg-purple-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all shadow-2xl shadow-purple-900/40">Shop the Range</button>
                            </div>
                        </div>

                        {/* Secondary Banners */}
                        <div className="grid grid-cols-2 gap-8 mb-16">
                            <div className="h-56 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/5 relative group bg-pink-100">
                                <img src="https://images.unsplash.com/photo-1628113315911-d19f99238d28?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" alt="Berries" />
                                <div className="absolute inset-0 flex flex-col justify-center px-12">
                                    <h3 className="text-3xl font-black text-pink-900 leading-tight">Sweetest<br />Fresh Berries</h3>
                                    <p className="text-[11px] font-black text-pink-700 uppercase tracking-widest mt-5 bg-white/40 w-max px-4 py-1 rounded-full">Save 40% Today</p>
                                </div>
                            </div>
                            <div className="h-56 rounded-[2.5rem] overflow-hidden shadow-xl border border-white/5 relative group bg-orange-100">
                                <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" alt="Fruits" />
                                <div className="absolute inset-0 flex flex-col justify-center px-12">
                                    <h3 className="text-3xl font-black text-orange-900 leading-tight">Seasonal<br />Orchard Harvest</h3>
                                    <p className="text-[11px] font-black text-orange-700 uppercase tracking-widest mt-5 bg-white/40 w-max px-4 py-1 rounded-full">Limited Stock</p>
                                </div>
                            </div>
                        </div>

                        {/* Category Headline */}
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                {activeCategory.name}
                                <span className="text-sm font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">{filteredProducts.length} Items</span>
                            </h3>
                        </div>

                        {/* Desktop Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 pb-32">
                            {filteredProducts.map(({ product: p }) => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    onClick={() => onProductClick(p)}
                                    addToCart={() => addToCart(p, p.units[0])}
                                    quantity={getQuantity(p.id, p.units[0].id)}
                                    removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                                    isFavorite={wishlist.includes(p.id)}
                                    toggleFavorite={() => toggleWishlist(p.id)}
                                />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

            {/* Sidebar Toggle Button (Floating when hidden) */}
            {isSidebarHidden && (
                <button
                    onClick={() => setIsSidebarHidden(false)}
                    className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-slate-800 text-purple-600 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] items-center justify-center z-50 hover:scale-110 transition-all border border-purple-50 dark:border-slate-700"
                >
                    <i className="fa-solid fa-chevron-right text-lg"></i>
                </button>
            )}
        </div>
    );
};

export default CategoriesView;
