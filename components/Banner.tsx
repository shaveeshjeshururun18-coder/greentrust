import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="px-6 mt-6 animate-popIn">
      <div className="relative w-full aspect-[16/8] rounded-[3rem] overflow-hidden shadow-2xl group shadow-slate-100">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&fit=crop"
          alt="Fresh Offer"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-center px-8">
          <div className="space-y-1">
            <span className="text-emerald-400 font-black text-[9px] tracking-[0.3em] uppercase mb-2 block animate-pulse-soft">Green Trust Special</span>
            <h2 className="text-white text-3xl font-black leading-tight tracking-tight">UP TO 50% <span className="text-emerald-400">CASHBACK</span></h2>
            <p className="text-slate-300 text-[10px] font-bold mt-2 max-w-[170px] leading-relaxed uppercase tracking-widest">Organic Purity • Instant Delivery</p>
            <button className="mt-6 bg-emerald-500 text-white text-[10px] font-black py-3 px-8 rounded-2xl w-fit hover:bg-emerald-600 active-pop transition-all uppercase tracking-widest shadow-xl shadow-emerald-500/20">
              Claim Offer
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Indicator dots */}
      <div className="flex justify-center gap-2.5 mt-5">
        <div className="w-10 h-1.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full active-pop"></div>
        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full active-pop"></div>
      </div>
    </div>
  );
};

export default Banner;
