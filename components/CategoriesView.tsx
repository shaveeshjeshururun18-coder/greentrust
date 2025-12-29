import React, { useState, useMemo, Suspense } from 'react';
import ProductCard from './ProductCard';
import { DETAILED_CATEGORIES } from '../constants.tsx';
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
    initialCategoryId?: string;
}

// Product Images Mock
const PRODUCT_IMAGES = [
    'product-4-1.jpg', 'product-5-1.jpg', 'product-6-1.jpg', 'product-7-1.jpg',
    'product-8-1.jpg', 'product-9-1.jpg', 'product-10-1.jpg', 'product-11-1.jpg',
    'product-13-1.jpg', 'product-15-1.jpg'
];

// Simple dictionary for demo purposes
const TAMIL_NAMES: { [key: string]: string } = {
    'Potato': 'உருளைக்கிழங்கு',
    'Tomato': 'தக்காளி',
    'Onion': 'வெங்காயம்',
    'Carrot': 'கேரட்',
    'Beans': 'பீன்ஸ்',
    'Brinjal': 'கத்தரிக்காய்',
    'Ladies Finger': 'வெண்டைக்காய்',
    'Cabbage': 'முட்டைக்கோஸ்',
    'Cauliflower': 'பூக்கோசு',
    'Ginger': 'இஞ்சி',
    'Garlic': 'பூண்டு',
    'Chilli': 'மிளகாய்',
    'Apple': 'ஆப்பிள்',
    'Orange': 'ஆரஞ்சு',
    'Banana': 'வாழைப்பழம்',
    'Grapes': 'திராட்சை',
    'Mango': 'மாம்பழம்',
    'Pineapple': 'அன்னாசி',
    'Watermelon': 'தர்பூசணி',
    'Spinach': 'பசலைக்கீரை',
    'Coriander': 'கொத்தமல்லி',
    'Mint': 'புதினா',
};

// Price Ranges
const PRICE_RANGES = [
    { id: 'p1', label: 'Under ₹50', min: 0, max: 50 },
    { id: 'p2', label: '₹50 - ₹100', min: 50, max: 100 },
    { id: 'p3', label: '₹100 - ₹200', min: 100, max: 200 },
    { id: 'p4', label: 'Above ₹200', min: 200, max: 9999 },
];

const CategoriesView: React.FC<CategoriesViewProps> = ({
    onBack,
    onProductClick,
    addToCart,
    removeFromCart,
    getQuantity,
    wishlist = [],
    toggleWishlist = () => { },
    initialCategoryId = 'all',
    ...props
}) => {
    // Mobile State: Active Category Tab
    const [activeMobileCategoryId, setActiveMobileCategoryId] = useState(initialCategoryId !== 'all' ? initialCategoryId : DETAILED_CATEGORIES[0].id);

    // Desktop State: Advanced Filters
    const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Default CLOSED (Slim Mode)
    const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId); // Default from prop
    const [expandedCategoryIds, setExpandedCategoryIds] = useState<string[]>(initialCategoryId !== 'all' ? [initialCategoryId] : [DETAILED_CATEGORIES[0].id]);
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const [customPriceRange, setCustomPriceRange] = useState<{ min: string, max: string }>({ min: '', max: '' });
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

    // Toggles
    const toggleExpand = (id: string) => {
        setExpandedCategoryIds(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
    };

    const toggleSubCategory = (subCatName: string) => {
        setSelectedSubCategories(prev =>
            prev.includes(subCatName)
                ? prev.filter(s => s !== subCatName)
                : [...prev, subCatName]
        );
    };

    const toggleMainCategorySelect = (catId: string, allSubCats: string[]) => {
        // If all subcats of this category are selected, deselect all. Otherwise, select all.
        const allSelected = allSubCats.every(sub => selectedSubCategories.includes(sub));
        if (allSelected) {
            setSelectedSubCategories(prev => prev.filter(s => !allSubCats.includes(s)));
        } else {
            // Add missing ones
            setSelectedSubCategories(prev => [...new Set([...prev, ...allSubCats])]);
        }
    };

    // Switch Category via Icon Rail
    const handleCategoryClick = (id: string) => {
        setActiveCategoryId(id);
        // Also expand it in the filter panel if not already
        if (id !== 'all' && !expandedCategoryIds.includes(id)) {
            setExpandedCategoryIds(prev => [...prev, id]);
        }
    };

    const togglePriceRange = (rangeId: string) => {
        setSelectedPriceRanges(prev => prev.includes(rangeId) ? prev.filter(r => r !== rangeId) : [...prev, rangeId]);
        setCustomPriceRange({ min: '', max: '' });
    };

    const clearFilters = () => {
        setSelectedSubCategories([]);
        setSelectedPriceRanges([]);
        setCustomPriceRange({ min: '', max: '' });
        setSortOrder(null);
    };

    // Flatten all products
    const allProducts = useMemo(() => {
        const products: { product: Product, categoryId: string, subCategoryName: string }[] = [];
        DETAILED_CATEGORIES.forEach(cat => {
            cat.subcategories.forEach(sub => {
                sub.items.forEach((itemName, index) => {
                    const imageIndex = (itemName.length + index) % PRODUCT_IMAGES.length;
                    const image = `/assets/products/${PRODUCT_IMAGES[imageIndex]}`;

                    // Simple lookup or default fallback
                    const tamilName = TAMIL_NAMES[itemName] || itemName;

                    const product: Product = {
                        id: `mock-${itemName.replace(/\s+/g, '-').toLowerCase()}`,
                        nameEn: itemName,
                        nameTa: tamilName,
                        image: image,
                        category: cat.name,
                        brandEn: 'Farm Fresh', // default
                        brandTa: 'Farm Fresh',
                        isVeg: true,
                        rating: 4.5,
                        ratingCount: 100,
                        deliveryTime: '15 MINS',
                        units: [{ id: 'u1', weight: '500g', price: 40 + (index * 5), mrp: 50 + (index * 6), discount: '' }],
                        descriptionEn: 'Fresh and organic, sourced directly from farmers.',
                        descriptionTa: ''
                    };
                    products.push({ product, categoryId: cat.id, subCategoryName: sub.name });
                });
            });
        });
        return products;
    }, []);

    // Filter Logic
    const filteredProducts = useMemo(() => {
        // Hydrate ALL_PRODUCTS with Category/Subcategory context if needed for filters?
        // Actually ALL_PRODUCTS doesn't store subCategoryId easily, but it stores 'category' name.
        // We need to map it back or rely on name matching?
        // Simpler: Just reconstruct the 'allProducts' with category metadata for local filtering.
        // BUT wait, ALL_PRODUCTS in constants is flat.
        // CategoriesView needs `categoryId`, `subCategoryName` for its filters.

        // Let's re-map ALL_PRODUCTS slightly to add the needed metadata for this view's specific filters
        // Or better yet, just traverse DETAILED_CATEGORIES like before to build the *view specific* list 
        // that INCLUDES the metadata, but uses the IDs to link to the global product if needed?
        // Actually, easiest way to keep it consistent is to use ALL_PRODUCTS and find its metadata.

        // Correction: The easiest way is to continue doing what we did in CategoriesView (generating it with metadata)
        // BUT make sure it matches what we put in constants.
        // Since I duplicated the logic in constants, they should result in same IDs.

        // However, to ensure they are EXACTLY the same objects (references), we should ideally use ALL_PRODUCTS.
        // But ALL_PRODUCTS lost the `subCategoryName` association in the flat list (unless we added it? We didn't).

        // For now, to solve the "Home Search" issue, `constants.tsx` having `ALL_PRODUCTS` is enough for App.tsx.
        // For `CategoriesView.tsx`, it can keep its own generation logic for now to preserve the complex filter relationships
        // without rewriting the entire filter logic. They will produce identical data visual-wise.

        // So I will REVERT the removal of generation logic in CategoriesView for this specific step to avoid breaking filters,
        // unless I am sure I can reconstruct metadata. 
        // Re-reading my previous thought: "Use ALL_MOCK_PRODUCTS as the base".
        // If I do that, I lose 'subCategoryName'.

        // DECISION: KEEP generic logic in CategoriesView (it works fine there).
        // The USER'S issue is "Home page search not listing".
        // So I ONLY need to update `App.tsx` to use `ALL_PRODUCTS`.
        // I will revert changes to CategoriesView in this tool call (by sending empty chunks or not calling it for CategoriesView).

        return allProducts.filter(({ product: p, subCategoryName, categoryId }) => {
            // 0. Search Filter (Global)
            if (props.searchQuery) {
                const q = props.searchQuery.toLowerCase();
                const match = p.nameEn.toLowerCase().includes(q) || (p.nameTa && p.nameTa.includes(q));
                if (!match) return false;
                // If searching, ignore category unless specific? 
                // Let's allow searching across ALL categories if 'all' is active, or restrict if specific one is active.
                // Actually, standard e-commerce behavior: Search Bar = Global Search.
                // So we likely want to ignore the sidebar category if match found?
                // OR just filter within the current view. 
                // Given the user flow, if they are in 'All Products' (which is default now), it searches all.
                // If they are deep in 'Vegetables', maybe they want to find 'Tomato' in Vegetables.
                // Let's respect the category filter IF it's not 'all'.
            }

            // 1. Main Category
            const categoryMatch = activeCategoryId === 'all' || activeCategoryId === categoryId;

            // 1. Subcategory (Only applies if not 'All', or if we want global subcat filter?)
            // Usually subcats are specific to a category. If 'All' is selected, we might clear subcats or strictly filter by name if they are global (unlikely).
            // Let's assume subcat filter only works when a specific category is active, OR we clear it when switching to 'All'.
            // For now, if 'All', we ignore subcat filter unless the user somehow selected one visually (which they can't easily in 'All' mode unless we show ALL subcats).
            // Simplest: only apply subcat filter if NOT 'all' mode.
            const subCatMatch = activeCategoryId === 'all' ? true : (selectedSubCategories.length === 0 || selectedSubCategories.includes(subCategoryName));

            // 2. Price Filter
            let priceMatch = true;
            const price = p.units[0].price;

            // Check Slider Range
            const minC = customPriceRange.min ? parseFloat(customPriceRange.min) : 0;
            const maxC = customPriceRange.max ? parseFloat(customPriceRange.max) : Infinity;

            if (customPriceRange.min !== '' || customPriceRange.max !== '') {
                priceMatch = price >= minC && price <= maxC;
            }
            // Else check Presets
            else if (selectedPriceRanges.length > 0) {
                priceMatch = selectedPriceRanges.some(rangeId => {
                    const range = PRICE_RANGES.find(r => r.id === rangeId);
                    return range && price >= range.min && price < range.max;
                });
            }

            return categoryMatch && subCatMatch && priceMatch;
        }).sort((a, b) => {
            if (!sortOrder) return 0;
            const priceA = a.product.units[0].price;
            const priceB = b.product.units[0].price;
            return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        });
    }, [allProducts, activeCategoryId, selectedSubCategories, selectedPriceRanges, customPriceRange, sortOrder, props.searchQuery]);

    const activeMobileCategory = DETAILED_CATEGORIES.find(c => c.id === activeMobileCategoryId) || DETAILED_CATEGORIES[0];
    const currentDesktopCategory = activeCategoryId === 'all'
        ? { name: 'All Products', subcategories: [] }
        : (DETAILED_CATEGORIES.find(c => c.id === activeCategoryId) || DETAILED_CATEGORIES[0]);

    return (
        <div className="h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative animate-fadeIn transition-all">

            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-30 bg-white dark:bg-slate-900 px-4 py-3 shadow-sm flex items-center gap-4">
                <button onClick={onBack} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="text-lg font-black text-slate-900 dark:text-white">Categories</h1>
            </div>

            {/* Desktop Sidebar Container */}
            <div className={`
                hidden md:flex
                flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                flex flex-row md:h-full
                transition-all duration-300 ease-in-out
                ${isFiltersOpen ? 'w-[320px]' : 'w-[88px]'}
                overflow-hidden z-30
            `}>

                {/* 1. Slim Icon Rail (Always Visible) */}
                <div className="w-[88px] flex-shrink-0 flex flex-col items-center py-6 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 h-full overflow-y-auto custom-scrollbar no-scrollbar">
                    <button onClick={onBack} className="w-10 h-10 mb-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    <div className="space-y-4 w-full px-2">
                        {/* All Products Option */}
                        <button
                            onClick={() => handleCategoryClick('all')}
                            className={`group flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 ${activeCategoryId === 'all' ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900'}`}
                        >
                            <i className="fa-solid fa-border-all text-xl mb-1"></i>
                            <span className="text-[9px] font-bold text-center leading-none">All</span>
                        </button>

                        <div className="h-px w-10 bg-slate-200 dark:bg-slate-700 my-2"></div>

                        {DETAILED_CATEGORIES.map(cat => {
                            const isActive = activeCategoryId === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategoryClick(cat.id)}
                                    className={`group flex flex-col items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-500/20 scale-105' : 'bg-white dark:bg-slate-800 text-slate-400 hover:bg-green-50 dark:hover:bg-slate-700 hover:text-green-600'}`}
                                >
                                    <i className={`fa-solid ${cat.icon} text-xl mb-1`}></i>
                                    <span className="text-[9px] font-bold text-center leading-none">{cat.name}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* 2. Expanded Filter Panel (Toggleable) */}
                <div className={`flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 transition-opacity duration-300 ${isFiltersOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <div className="p-5">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-black text-slate-900 dark:text-white">Filters</h2>
                            <button onClick={clearFilters} className="text-[10px] font-bold text-red-500 hover:underline uppercase">Reset</button>
                        </div>

                        {/* Price Slider */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Price</h3>
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700/50">
                                <p className="text-lg font-black text-slate-900 dark:text-white mb-6">
                                    ₹{customPriceRange.min || 0} – ₹{customPriceRange.max || 1000}
                                </p>
                                <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6">
                                    {/* Track Fill */}
                                    <div
                                        className="absolute h-full bg-green-600 rounded-full opacity-80"
                                        style={{
                                            left: `${((parseInt(customPriceRange.min || '0') / 1000) * 100)}%`,
                                            right: `${100 - ((parseInt(customPriceRange.max || '1000') / 1000) * 100)}%`
                                        }}
                                    ></div>

                                    {/* Range Inputs Stacked */}
                                    <input
                                        type="range"
                                        min="0" max="1000" step="10"
                                        value={customPriceRange.min || 0}
                                        onChange={(e) => {
                                            const val = Math.min(parseInt(e.target.value), parseInt(customPriceRange.max || '1000') - 50);
                                            setCustomPriceRange(p => ({ ...p, min: val.toString() }));
                                            setSelectedPriceRanges([]);
                                        }}
                                        className="absolute w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <input
                                        type="range"
                                        min="0" max="1000" step="10"
                                        value={customPriceRange.max || 1000}
                                        onChange={(e) => {
                                            const val = Math.max(parseInt(e.target.value), parseInt(customPriceRange.min || '0') + 50);
                                            setCustomPriceRange(p => ({ ...p, max: val.toString() }));
                                            setSelectedPriceRanges([]);
                                        }}
                                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                                    />

                                    {/* Custom Thumbs (Visual Only) */}
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-green-600 rounded-full shadow-lg pointer-events-none transition-all"
                                        style={{ left: `calc(${((parseInt(customPriceRange.min || '0') / 1000) * 100)}% - 12px)` }}
                                    ></div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-4 border-green-600 rounded-full shadow-lg pointer-events-none transition-all"
                                        style={{ left: `calc(${((parseInt(customPriceRange.max || '1000') / 1000) * 100)}% - 12px)` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                                    <span>Min</span>
                                    <span>Max (1k+)</span>
                                </div>
                            </div>
                        </div>

                        {/* Active Category Subcategories - Hide if 'All' */}
                        {activeCategoryId !== 'all' && (
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{currentDesktopCategory.name}</h3>
                                <div className="space-y-1">
                                    {(currentDesktopCategory as any).subcategories?.map((sub: any) => {
                                        const isSelected = selectedSubCategories.includes(sub.name);
                                        return (
                                            <label key={sub.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer group">
                                                <span className={`text-sm font-medium transition-colors ${isSelected ? 'text-green-600 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>{sub.name}</span>
                                                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${isSelected ? 'bg-green-500 border-green-500' : 'border-slate-200 group-hover:border-green-400'}`}>
                                                    {isSelected && <i className="fa-solid fa-check text-white text-[10px]"></i>}
                                                </div>
                                                <input type="checkbox" className="hidden" onChange={() => toggleSubCategory(sub.name)} checked={isSelected} />
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        {activeCategoryId === 'all' && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <p className="text-xs text-slate-400">Select a specific category to filter by subcategories.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content (Full Page) */}
            <div className="flex-1 h-[calc(100vh-64px)] md:h-screen overflow-y-auto p-4 md:p-8 custom-scrollbar bg-slate-50 dark:bg-slate-950">

                {/* Mobile Split View (Sidebar + Content) */}
                <div className="md:hidden flex h-[calc(100vh-120px)] overflow-hidden">

                    {/* Level 1: Sidebar (Categories) */}
                    <div className="w-[85px] flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 overflow-y-auto no-scrollbar pb-24">
                        <div className="flex flex-col items-center py-2 space-y-1">
                            <button
                                onClick={() => setActiveMobileCategoryId('all')}
                                className={`w-full py-4 flex flex-col items-center justify-center transition-all relative ${activeMobileCategoryId === 'all' ? 'text-green-600' : 'text-slate-400'}`}
                            >
                                {activeMobileCategoryId === 'all' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-full"></div>}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${activeMobileCategoryId === 'all' ? 'bg-green-50 dark:bg-green-900/30' : 'bg-slate-50 dark:bg-slate-800'}`}>
                                    <i className="fa-solid fa-border-all text-lg"></i>
                                </div>
                                <span className={`text-[10px] font-bold text-center leading-tight max-w-[60px] ${activeMobileCategoryId === 'all' ? 'text-green-700' : 'text-slate-500'}`}>All</span>
                            </button>

                            {DETAILED_CATEGORIES.map(cat => {
                                const isActive = activeMobileCategoryId === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveMobileCategoryId(cat.id)}
                                        className={`w-full py-3 flex flex-col items-center justify-center transition-all relative ${isActive ? 'text-green-600' : 'text-slate-400'}`}
                                    >
                                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-600 rounded-r-full"></div>}
                                        <div className={`w-12 h-12 rounded-full p-2 mb-1 transition-transform ${isActive ? 'bg-green-50 dark:bg-green-900/20 scale-105 shadow-sm' : 'bg-transparent'}`}>
                                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-90" />
                                        </div>
                                        <span className={`text-[9px] font-bold text-center leading-tight px-1 ${isActive ? 'text-green-800 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {cat.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Level 2: Content (Subcategories & Products) */}
                    <div className="flex-1 bg-slate-50 dark:bg-slate-950 overflow-y-auto w-full p-3 pb-24">
                        {activeMobileCategoryId === 'all' ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-base font-black text-slate-800 dark:text-white">All Products</h2>
                                    <span className="text-[10px] font-bold text-slate-400">{allProducts.length} Items</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {allProducts.slice(0, 20).map(({ product: p }) => (
                                        <div key={p.id}>
                                            <ProductCard
                                                product={p}
                                                onClick={() => onProductClick(p)}
                                                addToCart={() => addToCart(p, p.units[0])}
                                                quantity={getQuantity(p.id, p.units[0].id)}
                                                removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                                                isFavorite={wishlist.includes(p.id)}
                                                toggleFavorite={() => toggleWishlist(p.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-fadeIn relative h-full flex flex-col">
                                {/* Category Banner/Header with Search & Filter Icons */}
                                <div className="flex items-center justify-between mb-4 sticky top-0 bg-slate-50 dark:bg-slate-950 z-20 py-2 pt-3 shadow-sm md:shadow-none -mx-3 px-3">
                                    <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">{activeMobileCategory.name}</h2>
                                    <div className="flex items-center gap-3">
                                        <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400">
                                            <i className="fa-solid fa-magnifying-glass text-xs"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-slate-400">
                                            <i className="fa-solid fa-sliders text-xs"></i>
                                        </button>
                                    </div>
                                </div>

                                {/* Horizontal Subcategory Pills (The "Previous Filter") */}
                                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-4 -mx-3 px-3 pb-2 sticky top-[52px] z-10 bg-slate-50 dark:bg-slate-950/95 backdrop-blur-sm">
                                    {activeMobileCategory.subcategories.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => {
                                                const el = document.getElementById(`sub-${sub.id}`);
                                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            }}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:border-green-500 hover:text-green-600 transition-all flex-shrink-0"
                                        >
                                            {sub.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-6 pb-24">
                                    {activeMobileCategory.subcategories.map((sub) => {
                                        const subProps = allProducts.filter(p => p.categoryId === activeMobileCategory.id && p.subCategoryName === sub.name);
                                        if (subProps.length === 0) return null;
                                        return (
                                            <div key={sub.id} id={`sub-${sub.id}`} className="scroll-mt-32">
                                                <div className="flex items-center gap-2 mb-3 opacity-90">
                                                    <span className="w-1 h-3 bg-green-600 rounded-full"></span>
                                                    <h3 className="text-xs font-black text-green-800 dark:text-green-400 uppercase tracking-wide">{sub.name}</h3>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {subProps.map(({ product: p }) => (
                                                        <div key={p.id}>
                                                            <ProductCard
                                                                product={p}
                                                                onClick={() => onProductClick(p)}
                                                                addToCart={() => addToCart(p, p.units[0])}
                                                                quantity={getQuantity(p.id, p.units[0].id)}
                                                                removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                                                                isFavorite={wishlist.includes(p.id)}
                                                                toggleFavorite={() => toggleWishlist(p.id)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Desktop Grid */}
                <div className="hidden md:block pb-32 w-full">
                    {/* Header with improved spacing */}
                    <div className="flex items-center justify-between mb-8 py-4 border-b border-transparent">
                        <div className="flex items-center gap-6">
                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${isFiltersOpen ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-700 border-slate-200 hover:border-green-500 hover:text-green-600'}`}
                            >
                                <i className={`fa-solid ${isFiltersOpen ? 'fa-xmark' : 'fa-filter'}`}></i>
                                {isFiltersOpen ? 'Close Filters' : 'Filter'}
                            </button>

                            {/* Line Separator (Optional Gap) */}
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

                            <div>
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{currentDesktopCategory.name}</h1>
                                <p className="text-sm text-slate-500 font-medium mt-1">
                                    {filteredProducts.length} products found
                                </p>
                            </div>
                        </div>

                        {/* Sort */}
                        <div className="relative group">
                            <button
                                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 shadow-sm hover:shadow-md transition-all active:scale-95"
                            >
                                <i className={`fa-solid ${sortOrder === 'asc' ? 'fa-arrow-up-short-wide' : 'fa-arrow-down-short-wide'}`}></i>
                                {sortOrder === 'asc' ? 'Price: Low to High' : sortOrder === 'desc' ? 'Price: High to Low' : 'Sort by Price'}
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 opacity-50">
                            <i className="fa-solid fa-carrot text-6xl text-slate-300 mb-4"></i>
                            <p className="text-xl font-bold text-slate-400">No products found here.</p>
                        </div>
                    ) : (
                        // Responsive Grid: Can go very wide
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 Gap-6">
                            {filteredProducts.map(({ product: p }, idx) => {
                                return (
                                    <div key={p.id}>
                                        <ProductCard
                                            product={p}
                                            onClick={() => onProductClick(p)}
                                            addToCart={() => addToCart(p, p.units[0])}
                                            quantity={getQuantity(p.id, p.units[0].id)}
                                            removeFromCart={() => removeFromCart(p.id, p.units[0].id)}
                                            isFavorite={wishlist.includes(p.id)}
                                            toggleFavorite={() => toggleWishlist(p.id)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Footer (Desktop Only) */}
                <Footer />
            </div>
        </div>
    );
};

export default CategoriesView;
