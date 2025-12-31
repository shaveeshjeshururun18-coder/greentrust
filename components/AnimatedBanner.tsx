import React, { useEffect, useState } from 'react';

const AnimatedBanner: React.FC = () => {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame(prev => (prev + 1) % 2);
        }, 1200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="px-4 mt-2 animate-slideUp">
            {/* Main Banner Container with Farm/Fresh Theme */}
            <div className="relative w-full overflow-hidden rounded-2xl md:rounded-[2rem] shadow-2xl group border border-green-100 min-h-[280px] md:min-h-[500px]">

                {/* VIDEO BACKGROUND LAYER */}
                <div className="absolute inset-0 bg-slate-100 z-0">
                    {/* Fallback Image with Ken Burns Effect */}
                    <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop"
                        alt="Fresh Farm Vegetables"
                        className="w-full h-full object-cover opacity-90 animate-[kenBurns_20s_infinite_alternate]"
                        fetchPriority="high"
                    />
                    {/* Real Video Overlay (Try to load if available) */}
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
                        poster="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop"
                    >
                        {/* A high quality free stock video of vegetables or nature */}
                        <source src="https://videos.pexels.com/video-files/2255479/2255479-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Gradient Overlay for Text Readability - Warm/Daylight */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent z-10"></div>
                </div>

                {/* ANIMATED PARTICLES & REFLECTIONS */}
                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                    {/* Sun Rays Rotating */}
                    <div className="absolute -top-[50%] -right-[50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,white_10deg,transparent_20deg,white_30deg,transparent_40deg)] opacity-10 animate-[spinSlow_60s_linear_infinite]"></div>

                    {/* Floating 'Dust' / Magic Particles */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full blur-[1px] animate-[float_4s_ease-in-out_infinite]"></div>
                    <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-[float_6s_ease-in-out_infinite_reverse]"></div>
                    <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-green-300 rounded-full blur-[2px] opacity-50 animate-[float_5s_ease-in-out_infinite]"></div>

                    {/* Passing Cloud Shadows */}
                    <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/h-s-c/realistic-clouds/master/dist/cloud.png')] bg-cover opacity-10 animate-[panImage_30s_linear_infinite]"></div>

                    {/* Marquee Text Layer (Behind content, low opacity) */}
                    <div className="absolute top-10 left-0 w-full overflow-hidden opacity-40 pointer-events-none">
                        <div className="whitespace-nowrap animate-[scrollLeft_30s_linear_infinite]">
                            <span className="text-8xl font-black text-white px-4">Freshora • Greensio • Nutrify • Harvesta • Vegora • Purelia • Farmora • Leafora • Ecozia • Freshlet • </span>
                            <span className="text-8xl font-black text-white px-4">Freshora • Greensio • Nutrify • Harvesta • Vegora • Purelia • Farmora • Leafora • Ecozia • Freshlet • </span>
                        </div>
                    </div>
                </div>

                <div className="relative z-30 p-4 md:p-10 flex flex-col items-start justify-center h-full">

                    {/* Brand Badge with Pulse */}
                    <div className="mb-2 md:mb-6 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full flex items-center gap-2 animate-fadeIn hover:bg-white/20 transition-colors cursor-pointer origin-left scale-75 md:scale-100">
                        <i className="fa-solid fa-leaf text-green-400 animate-bounce"></i>
                        <span className="text-white font-bold text-[10px] tracking-[0.2em] uppercase">Est. 2026 • Certified Organic</span>
                    </div>

                    {/* Main Text Effect: "GREEN TRUST" - Cinematic Entrance */}
                    <div className="overflow-hidden mb-6 md:mb-8">
                        {/* Changed to brighter green for better visibility */}
                        <h1 className="text-4xl md:text-8xl font-black text-green-400 uppercase tracking-tighter drop-shadow-2xl mb-0 leading-[0.85] animate-[slideInRight_0.8s_ease-out]" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                            GREEN
                        </h1>
                    </div>
                    <div className="flex items-center gap-4 mb-2 md:mb-6">
                        <h1 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-2xl leading-[0.85] animate-[slideInRight_1s_ease-out]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            TRUST
                        </h1>
                        <div className="relative hidden md:block group cursor-pointer">
                            <i className="fa-solid fa-shield-heart text-green-500 text-5xl animate-[pulse_2s_infinite] drop-shadow-lg group-hover:scale-110 transition-transform"></i>
                            <div className="absolute inset-0 bg-green-400 blur-2xl opacity-20 animate-ping"></div>
                        </div>
                    </div>

                    {/* Subtext with Typewriter feel or simple fade */}
                    <div className="relative overflow-hidden mb-4 md:mb-10">
                        <p className="text-green-50 font-medium text-sm md:text-2xl tracking-wide max-w-[250px] md:max-w-lg leading-snug drop-shadow-md animate-[fadeIn_1.5s_ease-out]">
                            Healthy Groceries You Can Trust.
                        </p>
                        <div className="flex items-center gap-3 mt-1 md:mt-3 animate-[fadeIn_2s_ease-out]">
                            <span className="h-[1px] w-4 md:w-8 bg-green-400"></span>
                            <span className="text-[10px] md:text-base opacity-90 font-light text-green-100 uppercase tracking-widest">Fresh • Organic</span>
                        </div>
                    </div>

                    {/* Trust Badges Row - Glassmorphism - Hidden on mobile for space */}
                    <div className="hidden md:flex flex-wrap items-center gap-3 md:gap-4 mb-10 animate-slideUp stagger-1">
                        {[
                            { icon: 'fa-seedling', color: 'text-green-400', text: '100% Organic' },
                            { icon: 'fa-tractor', color: 'text-yellow-400', text: 'Farm Direct' },
                            { icon: 'fa-flask', color: 'text-blue-400', text: 'No Chemicals' },
                            { icon: 'fa-truck-fast', color: 'text-orange-400', text: 'Fast Delivery' },
                            { icon: 'fa-shield-halved', color: 'text-purple-400', text: 'Secure Pay' },
                        ].map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 hover:scale-105 transition-all cursor-default shadow-lg">
                                <i className={`fa-solid ${badge.icon} ${badge.color}`}></i>
                                <span className="text-xs font-bold text-white">{badge.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button - Glowing & active */}
                    <button className="group relative bg-green-600 hover:bg-green-500 text-white font-black text-xs md:text-lg px-6 py-3 md:px-10 md:py-5 rounded-2xl shadow-[0_20px_40px_rgba(22,163,74,0.4)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all uppercase tracking-widest flex items-center gap-2 md:gap-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                        <span className="relative z-10">Shop Now</span>
                        <i className="fa-solid fa-arrow-right-long relative z-10 text-sm md:text-xl group-hover:translate-x-2 transition-transform"></i>
                    </button>

                    {/* Absolute Offer Cards - Hidden on Mobile to prevent clutter/overlapping */}
                    <div className="hidden md:flex absolute right-10 bottom-10 flex-col gap-4 z-40">

                        {/* Offer Card 1 */}
                        <div className="bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/50 animate-[float_4s_ease-in-out_infinite] hover:scale-105 transition-transform cursor-pointer origin-bottom-right">
                            <div className="flex items-start justify-between mb-2">
                                <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">First Order</span>
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                                    <i className="fa-solid fa-gift text-green-600 text-xs"></i>
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-900 font-black text-2xl leading-none mb-1">₹300 OFF</p>
                                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wide">On orders above ₹999</p>
                            </div>
                        </div>

                        {/* Offer Card 2 */}
                        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-4 rounded-2xl shadow-2xl border border-green-500/50 animate-[float_5s_ease-in-out_infinite_reverse] hover:scale-105 transition-transform cursor-pointer origin-bottom-right">
                            <div className="flex items-start justify-between mb-2">
                                <span className="bg-white/20 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Limited Time</span>
                                <i className="fa-solid fa-percent text-white text-sm opacity-80"></i>
                            </div>
                            <div>
                                <p className="text-white font-black text-2xl leading-none mb-1">Flat 50%</p>
                                <p className="text-green-100 text-[10px] font-bold uppercase tracking-wide">Organic Fresh Picks</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Quick Action Buttons (Under Banner) */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-green-100 dark:hover:bg-green-900/40 transition-all active:scale-95 group shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-basket-shopping text-green-600 dark:text-green-400"></i>
                    </div>
                    <span className="text-xs font-black text-green-800 dark:text-green-300">Shop Fresh Now</span>
                </button>

                <button className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-all active:scale-95 group shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-carrot text-orange-600 dark:text-orange-400"></i>
                    </div>
                    <span className="text-xs font-black text-orange-800 dark:text-orange-300">Eat Healthy Today</span>
                </button>

                <button className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all active:scale-95 group shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-truck-fast text-blue-600 dark:text-blue-400"></i>
                    </div>
                    <span className="text-xs font-black text-blue-800 dark:text-blue-300">Doorstep Delivery</span>
                </button>

                <button className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-3 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all active:scale-95 group shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <i className="fa-solid fa-heart text-red-600 dark:text-red-400"></i>
                    </div>
                    <span className="text-xs font-black text-red-800 dark:text-red-300">Trusted by Families</span>
                </button>
            </div>
            {/* Scrolling Marquee - Single Line Text */}
            <div className="mt-8 mb-2 overflow-hidden relative w-full py-3 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
                <div className="whitespace-nowrap flex animate-[scrollLeft_25s_linear_infinite] gap-12 text-slate-400 dark:text-slate-500 font-bold text-sm md:text-base uppercase tracking-widest">
                    <span className="flex items-center gap-2">Fresh Groceries, Delivered Daily <i className="fa-solid fa-bolt text-yellow-400"></i></span>
                    <span className="flex items-center gap-2">Delivered with <i className="fa-solid fa-heart text-red-500"></i> in Tamil Nadu</span>
                    <span className="flex items-center gap-2">Shop Fresh Now <i className="fa-solid fa-basket-shopping text-green-400"></i></span>
                    <span className="flex items-center gap-2">Order Groceries <i className="fa-solid fa-leaf text-green-500"></i></span>
                    <span className="flex items-center gap-2">Start Shopping <i className="fa-solid fa-cart-plus text-blue-400"></i></span>
                    <span className="flex items-center gap-2">Buy Fresh Today <i className="fa-solid fa-carrot text-orange-400"></i></span>
                    <span className="flex items-center gap-2">Get Fresh Groceries <i className="fa-solid fa-truck-fast text-slate-400"></i></span>

                    {/* Duplicate for infinite loop */}
                    <span className="flex items-center gap-2">Fresh Groceries, Delivered Daily <i className="fa-solid fa-bolt text-yellow-400"></i></span>
                    <span className="flex items-center gap-2">Delivered with <i className="fa-solid fa-heart text-red-500"></i> in Tamil Nadu</span>
                    <span className="flex items-center gap-2">Shop Fresh Now <i className="fa-solid fa-basket-shopping text-green-400"></i></span>
                    <span className="flex items-center gap-2">Order Groceries <i className="fa-solid fa-leaf text-green-500"></i></span>
                    <span className="flex items-center gap-2">Start Shopping <i className="fa-solid fa-cart-plus text-blue-400"></i></span>
                    <span className="flex items-center gap-2">Buy Fresh Today <i className="fa-solid fa-carrot text-orange-400"></i></span>
                    <span className="flex items-center gap-2">Get Fresh Groceries <i className="fa-solid fa-truck-fast text-slate-400"></i></span>
                </div>
                <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10"></div>
                <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10"></div>
            </div>

            {/* Custom Keyframe Styles injected for this component */}
            <style>{`
        @keyframes kenBurns {
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.1) translate(-1%, -1%); }
        }
        @keyframes spinSlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        @keyframes panImage {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 0%; }
        }
        @keyframes scrollLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        @keyframes scrollVertical {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
        }
      `}</style>
        </div>
    );
};

export default AnimatedBanner;
