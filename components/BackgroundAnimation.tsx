import React, { useEffect, useState } from 'react';

const BackgroundAnimation: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX - window.innerWidth / 2) / 20,
                y: (e.clientY - window.innerHeight / 2) / 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Micro-pattern SVG (vegetable line art)
    const vegPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c-2-5-5-8-10-10 2 5 8 5 10 10zm0 0c2-5 5-8 10-10-2 5-8 5-10 10zm0 0c0 10-5 15-10 18 5-2 10-5 10-18zm0 0c0 10 5 15 10 18-5-2-10-5-10-18z' fill='%2316a34a' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#Fdfdfd] dark:bg-slate-950 transition-colors duration-500">
            {/* 1. Organic Flow Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0FFF4] via-[#F8FFF9] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 opacity-100"></div>

            {/* 4. Recycled Paper Texture */}
            <div className="absolute inset-0 opacity-30 mix-blend-multiply dark:mix-blend-overlay pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
            }}></div>

            {/* 3. Micro-Patterns */}
            <div className="absolute inset-0 opacity-40 dark:opacity-5" style={{ backgroundImage: vegPattern }}></div>

            {/* 2. Abstract Blobs */}
            <div
                className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-gradient-to-br from-green-200/40 to-emerald-200/40 dark:from-green-900/10 dark:to-emerald-900/10 blur-[80px] animate-float-slow rounded-[30%_70%_70%_30%/30%_30%_70%_70%]"
                style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
            ></div>

            <div
                className="absolute -bottom-[10%] -left-[10%] w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] bg-gradient-to-tr from-blue-100/40 to-green-100/40 dark:from-blue-900/10 dark:to-green-900/10 blur-[100px] animate-float-reverse rounded-[70%_30%_30%_70%/60%_40%_60%_40%]"
                style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
            ></div>

            {/* Floating 3D Decoration Images (Desktop Only usually, but fine on mobile too as regular images) */}
            <img
                src="/assets/decoration/veg_1.png"
                className="hidden md:block absolute top-[15%] left-[10%] w-24 opacity-60 blur-[1px] object-contain drop-shadow-xl"
                style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px) rotate(-15deg)` }}
                alt=""
            />
            <img
                src="/assets/decoration/veg_4.png"
                className="hidden md:block absolute bottom-[20%] right-[15%] w-32 opacity-50 blur-[2px] object-contain drop-shadow-xl"
                style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px) rotate(10deg)` }}
                alt=""
            />
            <img
                src="/assets/decoration/watermalone_1.png"
                className="hidden md:block absolute top-[40%] right-[5%] w-20 opacity-40 blur-[3px] object-contain"
                style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px) rotate(45deg)` }}
                alt=""
            />
            <img
                src="/assets/decoration/veg_3.png"
                className="hidden md:block absolute bottom-[10%] left-[20%] w-28 opacity-40 blur-[1px] object-contain"
                style={{ transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px) rotate(-5deg)` }}
                alt=""
            />

            {/* Floating Particles */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-green-400/20 dark:bg-green-400/5 rounded-full blur-[1px] animate-rise"
                    style={{
                        width: `${Math.random() * 15 + 5}px`,
                        height: `${Math.random() * 15 + 5}px`,
                        left: `${Math.random() * 100}%`,
                        bottom: '-20px',
                        animationDuration: `${Math.random() * 15 + 15}s`,
                        animationDelay: `${Math.random() * 10}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

export default BackgroundAnimation;
