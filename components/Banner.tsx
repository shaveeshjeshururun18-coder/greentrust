
import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="px-4 mt-4 animate-slideUp">
      <div className="relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&fit=crop" 
          alt="Fresh Offer" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8">
          <div className="animate-float">
            <span className="text-green-400 font-black text-[10px] tracking-[0.2em] uppercase mb-2 block animate-pulse">Fresh & Organic</span>
            <h2 className="text-white text-3xl font-black leading-tight drop-shadow-lg">FLAT 50% <span className="text-green-400">OFF</span></h2>
            <p className="text-white/80 text-xs font-bold mt-2 max-w-[150px]">Purity you can trust, prices you'll love.</p>
            <button className="mt-5 bg-green-600 text-white text-[10px] font-black py-2.5 px-6 rounded-2xl w-fit hover:bg-green-700 transition-all active-pop uppercase tracking-widest shadow-xl shadow-green-900/20">
              Shop Now
            </button>
          </div>
        </div>
        
        {/* Animated decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>
      
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-8 h-1.5 bg-green-600 rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full transition-all hover:scale-150 cursor-pointer"></div>
        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full transition-all hover:scale-150 cursor-pointer"></div>
        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full transition-all hover:scale-150 cursor-pointer"></div>
      </div>
    </div>
  );
};

export default Banner;
