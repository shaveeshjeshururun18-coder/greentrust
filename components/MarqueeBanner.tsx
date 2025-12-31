import React from 'react';

const MarqueeBanner = () => {
    const content = [
        { text: "Eat Healthy Today", icon: "fa-carrot" },
        { text: "Choose Organic", icon: "fa-leaf" },
        { text: "Go Green 🌱", icon: "fa-seedling" },
        { text: "Fresh & Organic", icon: "fa-apple-whole" },
        { text: "Farm to Table", icon: "fa-tractor" },
        { text: "100% Natural", icon: "fa-award" },
    ];

    return (
        <div className="relative z-30 py-4 bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-y border-white/10 shadow-2xl overflow-hidden glass-effect">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="flex animate-marquee whitespace-nowrap relative z-10">
                {/* Quadruple the content for ultra-wide screens */}
                {[...Array(12)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center gap-12 mx-6">
                        {content.map((item, idx) => (
                            <div key={`${groupIndex}-${idx}`} className="flex items-center gap-3">
                                <i className={`fa-solid ${item.icon} text-green-400 text-lg drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]`}></i>
                                <span className="text-sm font-black uppercase tracking-[0.2em] text-white/90 drop-shadow-sm font-sans">{item.text}</span>
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-8 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        .glass-effect {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
        </div>
    );
};

export default MarqueeBanner;
