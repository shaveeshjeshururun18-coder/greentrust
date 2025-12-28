
import React from 'react';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
  onCategoryClick: (id: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategoryClick }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {CATEGORIES.map((cat, index) => (
        <div 
          key={cat.id} 
          onClick={() => onCategoryClick(cat.id)}
          className={`flex flex-col items-center cursor-pointer group animate-popIn stagger-${(index % 6) + 1}`}
        >
          <div className={`${cat.color} w-full aspect-square rounded-[2rem] p-4 flex items-center justify-center transition-all duration-300 group-hover:scale-90 group-active:scale-110 shadow-sm relative overflow-hidden`}>
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rotate-45"></div>
            
            <img 
              src={cat.image} 
              alt={cat.nameEn} 
              className="w-full h-full object-contain rounded-lg mix-blend-multiply drop-shadow-md group-hover:rotate-12 transition-transform"
            />
          </div>
          <div className="mt-3 text-center">
            <p className="text-[11px] font-black text-gray-800 leading-tight uppercase tracking-tight">{cat.nameEn}</p>
            <p className="text-[9px] text-gray-500 font-bold mt-0.5">{cat.nameTa}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
