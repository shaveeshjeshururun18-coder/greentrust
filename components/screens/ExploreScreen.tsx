import React from 'react';
import { Category } from '../../types';

interface ExploreScreenProps {
    categories: string[];
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    onNavigateHome: () => void;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
    categories,
    activeCategory,
    setActiveCategory,
    onNavigateHome
}) => {
    const categoryIcons = ['fa-list', 'fa-carrot', 'fa-lemon', 'fa-cubes']; // Default icons mapping
    const categoryColors = [
        'bg-blue-50 text-blue-600',
        'bg-green-50 text-green-600',
        'bg-orange-50 text-orange-600',
        'bg-purple-50 text-purple-600'
    ];

    return (
        <div className="px-5 mt-6 animate-in slide-in-from-right duration-500">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tighter">Explore <span className="text-emerald-600">Categories</span></h2>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            onNavigateHome();
                        }}
                        className={`p-6 rounded-[2rem] border-2 text-left transition-all duration-300 group hover:scale-[1.02] active:scale-95 flex flex-col justify-between h-40 ${activeCategory === cat
                                ? 'border-emerald-500 bg-emerald-50/50'
                                : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-100/50'
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 ${categoryColors[idx % categoryColors.length]}`}>
                            <i className={`fas ${['fa-house', 'fa-carrot', 'fa-lemon', 'fa-cubes'][idx] || 'fa-tag'}`}></i>
                        </div>
                        <div>
                            <p className="text-lg font-black text-slate-900 leading-none mb-1">{cat}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-emerald-600">Browse Items</p>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[2.5rem] relative overflow-hidden text-white shadow-xl shadow-emerald-200">
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-emerald-200">Fresh from Farm</p>
                    <h3 className="text-xl font-black mb-4 w-2/3">Get 20% Off on your first vegetable order</h3>
                    <button
                        onClick={() => {
                            setActiveCategory('Vegetables');
                            onNavigateHome();
                        }}
                        className="bg-white text-emerald-700 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg active:scale-95 transition-transform"
                    >
                        Shop Now
                    </button>
                </div>
                <i className="fas fa-leaf absolute -bottom-4 -right-4 text-9xl text-white opacity-20 rotate-12"></i>
            </div>
        </div>
    );
};
