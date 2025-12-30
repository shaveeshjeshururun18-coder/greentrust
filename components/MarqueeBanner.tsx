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
        <div className="bg-green-600 text-white py-2 overflow-hidden border-y border-green-700 relative z-30">
            <div className="flex animate-marquee whitespace-nowrap">
                {/* Triple the content to ensure smooth seamless loop on wide screens */}
                {[...Array(6)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center gap-8 mx-4">
                        {content.map((item, idx) => (
                            <div key={`${groupIndex}-${idx}`} className="flex items-center gap-2 font-black uppercase text-xs track-widest">
                                <i className={`fa-solid ${item.icon} text-green-200`}></i>
                                <span>{item.text}</span>
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full ml-6"></span>
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
          animation: marquee 40s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default MarqueeBanner;
