
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
  onCategoryClick: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 mb-4 px-2 uppercase tracking-tight">What's on your mind?</h3>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 px-2">
        {CATEGORIES.map((cat, index) => (
          <div
            key={cat.id}
            onClick={() => onCategoryClick(cat.id)}
            className={`flex flex-col items-center cursor-pointer group animate-popIn stagger-${(index % 6) + 1}`}
          >
            <div className={`${cat.color} w-full aspect-square rounded-full p-3 flex items-center justify-center transition-all duration-300 group-hover:scale-95 group-active:scale-105 shadow-sm relative overflow-hidden ring-4 ring-transparent group-hover:ring-slate-100 dark:group-hover:ring-slate-700`}>
              <img
                src={cat.image}
                alt={cat.nameEn}
                className="w-full h-full object-cover rounded-full mix-blend-multiply drop-shadow-lg group-hover:rotate-6 transition-transform"
              />
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">{cat.nameEn}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
