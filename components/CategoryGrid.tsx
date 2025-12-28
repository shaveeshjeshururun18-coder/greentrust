import React from 'react';
import { Category } from '../types.ts';

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
  activeCategory: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryClick, activeCategory }) => {
  return (
    <div className="px-6 mb-8 overflow-hidden">
      <div className="flex justify-between items-end mb-5">
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
        <button className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, idx) => (
          <button
            key={category.name}
            onClick={() => onCategoryClick(category.name)}
            className={`flex flex-col items-center group active-pop animate-popIn stagger-${(idx % 5) + 1}`}
          >
            <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-2.5 transition-all duration-500 overflow-hidden relative shadow-lg ${activeCategory === category.name
                ? 'bg-emerald-500 shadow-emerald-200 scale-105'
                : 'bg-white shadow-slate-100 hover:shadow-emerald-100 hover:-translate-y-1'
              }`}>
              <img
                src={category.image}
                alt={category.name}
                className="w-10 h-10 object-contain group-hover:scale-125 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className={`text-[10px] font-black text-center leading-tight transition-colors ${activeCategory === category.name ? 'text-emerald-600' : 'text-slate-600'
              }`}>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
