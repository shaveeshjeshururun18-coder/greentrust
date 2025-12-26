import React from 'react';

interface VoiceListeningOverlayProps {
    onClose: () => void;
}

export const VoiceListeningOverlay: React.FC<VoiceListeningOverlayProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
            <div className="relative">
                {/* Ripple Animation */}
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-[-20px] bg-emerald-500 rounded-full animate-ping opacity-10 animation-delay-500"></div>

                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 relative z-10">
                    <i className="fas fa-microphone text-4xl text-white"></i>
                </div>
            </div>

            <h3 className="text-2xl font-black text-white mt-10 tracking-tight">Listening...</h3>
            <p className="text-emerald-200/60 font-medium text-sm mt-2">Try saying "Tomato" or "Fresh Fruits"</p>

            <div className="flex gap-2 mt-12 h-8 items-end">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-2 bg-white rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
            </div>

            <button
                onClick={onClose}
                className="mt-16 w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
                <i className="fas fa-times text-xl"></i>
            </button>
        </div>
    );
};
