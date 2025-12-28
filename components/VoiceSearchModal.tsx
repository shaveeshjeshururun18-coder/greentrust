import React, { useState, useEffect } from 'react';

interface VoiceSearchModalProps {
    onClose: () => void;
    onResult: (text: string) => void;
}

const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ onClose, onResult }) => {
    const [isListening, setIsListening] = useState(true);
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        // Simulate finding a result after 3 seconds
        const timeout = setTimeout(() => {
            setIsListening(false);
            onResult('Fresh Organic Apples');
            setTimeout(onClose, 1200);
        }, 3500);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [onClose, onResult]);

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xl animate-fadeIn" onClick={onClose}></div>

            <div className="relative w-full max-w-xs animate-popIn text-center">
                <div className="mb-12 relative">
                    {/* Pulsing Audio Waves */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-emerald-500/20 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full animate-pulse-soft"></div>

                    <div className="relative w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/50">
                        <i className="fa-solid fa-microphone text-white text-4xl animate-bounce"></i>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                    {isListening ? 'Listening' + dots : 'Found Result'}
                </h2>
                <p className="text-emerald-300 font-black text-xs uppercase tracking-[0.3em] mb-8">
                    {isListening ? 'Speak now...' : 'Processing...'}
                </p>

                {!isListening && (
                    <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/20 animate-popIn">
                        <p className="text-white font-black text-lg">"Fresh Organic Apples"</p>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-12 w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/20 active-pop hover:bg-white/20 transition-all mx-auto"
                >
                    <i className="fa-solid fa-xmark text-xl"></i>
                </button>
            </div>
        </div>
    );
};

export default VoiceSearchModal;
