import React from 'react';
import { DetailedCategory } from '../types';
import { DETAILED_CATEGORIES } from '../constants';

interface AllCategoriesViewProps {

    onCategoryClick: (categoryId: string) => void;
    cartCount: number;
}

const AllCategoriesView: React.FC<AllCategoriesViewProps> = ({
    onCategoryClick,

    cartCount
}) => {
    return (
        <div className="min-h-screen bg-slate-50 pb-24 animate-fadeIn">
            {/* Custom Mobile Header "like that" */}
            <div className="sticky top-0 z-40 bg-white shadow-sm pb-2">
                {/* Top Bar: Title & Back (if needed, but it's a main tab) */}
                <div className="flex items-center justify-between px-4 py-3">
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">All Categories</h1>
                    {/* Optional: Cart Icon or similar if needed */}
                </div>
            </div>

            {/* Categories Grid */}
            <div className="p-4">
                <div className="grid grid-cols-4 gap-y-6 gap-x-2"> {/* Changed to 4 cols for "Blinkit" density, or 3? User image resembles a denser grid or 2 col? Reference usually has 4 small icons or 2 large cards. Let's try 4 cols for "icons" layout or 3. constants.tsx has ~6 main categories.  */}

                    {/* Actually, user image "add gcategroy page like this" usually implies the standard 2-3 column card grid or "Sidebar + Content" style. 
             If it's the "All Categories" page (like Zepto/Blinkit/Swiggy Instamart "Categories" tab), it's often a sidebar on left and grid on right OR a full grid.
             Given "user clicks it goes to all products", it implies these are ROOT categories.
             Let's do a clean GRID layout.
          */}
                    {DETAILED_CATEGORIES.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => onCategoryClick(cat.id)}
                            className="flex flex-col items-center gap-2 cursor-pointer group"
                        >
                            <div className="w-20 h-20 bg-green-50/50 rounded-2xl flex items-center justify-center p-2 border border-slate-100 shadow-sm group-active:scale-95 transition-transform">
                                <img src={cat.image} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply drop-shadow-sm" />
                            </div>
                            <span className="text-[11px] font-bold text-slate-700 text-center leading-tight px-1">{cat.name}</span>
                        </div>
                    ))}
                </div>

                {/* Decorative "Explore" Section below if list is short */}
                <div className="mt-8 pt-8 border-t border-slate-200 border-dashed">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Explore by Collection</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-center gap-3" onClick={() => onCategoryClick('dc4')}>
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><i className="fa-solid fa-star"></i></div>
                            <span className="font-bold text-purple-800 text-xs">Premium</span>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex items-center gap-3" onClick={() => onCategoryClick('dc2')}>
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"><i className="fa-solid fa-fire"></i></div>
                            <span className="font-bold text-orange-800 text-xs">Trending</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCategoriesView;
