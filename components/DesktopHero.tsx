import React from 'react';

const DesktopHero: React.FC = () => {
    // Micro-pattern SVG (vegetable line art)
    const vegPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 30c-2-5-5-8-10-10 2 5 8 5 10 10zm0 0c2-5 5-8 10-10-2 5-8 5-10 10zm0 0c0 10-5 15-10 18 5-2 10-5 10-18zm0 0c0 10 5 15 10 18-5-2-10-5-10-18z' fill='%2316a34a' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`;

    return (
        <div className="hidden md:block absolute top-0 left-0 w-full h-[60vh] z-0 rounded-b-[4rem] overflow-hidden pointer-events-none">
            {/* 1. Organic Flow Gradient: Pale Mint -> White (Dark: Slate -> Slate) */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F0FFF4] via-[#F8FFF9] to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500"></div>

            {/* 4. Recycled Paper Texture (Noise Overlay) */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`
            }}></div>

            {/* 3. Micro-Patterns (Wallpaper Look) */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: vegPattern }}></div>

            {/* 2. Abstract Blobs */}
            <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px] animate-float-slow"></div>
            <div className="absolute top-40 -left-20 w-[400px] h-[400px] bg-lime-200/20 rounded-full blur-[100px] animate-float-reverse"></div>

            {/* Additional organic shape (SVG) */}
            <svg className="absolute bottom-0 right-0 w-[600px] h-[600px] text-green-100/30 -z-10 animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,33.5C59,43.9,47.1,51.1,34.9,56.7C22.7,62.3,10.2,66.4,-3.2,71.9C-16.6,77.4,-30.9,84.4,-43.3,78.8C-55.7,73.2,-66.2,55,-73.4,38.3C-80.6,21.6,-84.5,6.4,-82.7,-8C-80.9,-22.4,-73.4,-36,-62.7,-46.8C-52,-57.6,-38,-65.6,-24.1,-73.1C-10.2,-80.6,3.6,-87.6,17.4,-84.4C31.2,-81.2,45,-67.8,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>

            {/* Content Overlay (Optional: If we want to put text here later, but for now it's just bg) */}
        </div>
    );
};

export default DesktopHero;
