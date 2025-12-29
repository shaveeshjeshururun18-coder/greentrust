import React, { useEffect, useState } from 'react';

interface EntranceScreenProps {
    onComplete: () => void;
}

const EntranceScreen: React.FC<EntranceScreenProps> = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 500); // Wait for fade out animation
        }, 2500); // Display for 2.5 seconds

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[100] bg-green-600 flex flex-col items-center justify-center text-white md:hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="animate-bounce-slow flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-700">
                    <i className="fa-solid fa-leaf text-4xl text-green-600"></i>
                </div>
                <h1 className="text-4xl font-black tracking-tight mb-2">Green Trust</h1>
                <p className="text-green-100 font-medium tracking-widest text-xs uppercase">Organic Marketplace</p>
            </div>

            <div className="absolute bottom-12 flex flex-col items-center animate-fadeIn text-center opacity-80">
                <p className="text-[10px] uppercase tracking-widest mb-1">Developed by</p>
                <p className="text-sm font-black tracking-wide">S.Shaveesh Jeshurun SSJ</p>
            </div>
        </div>
    );
};

export default EntranceScreen;
