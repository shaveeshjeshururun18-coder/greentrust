import React from 'react';

interface OrderSuccessScreenProps {
    onContinue: () => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({ onContinue }) => {
    return (
        <div className="fixed inset-0 z-[200] bg-emerald-600 flex flex-col items-center justify-center text-white p-5 animate-in zoom-in-95 duration-500">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-900/50 animate-bounce">
                <i className="fas fa-check text-6xl text-emerald-600"></i>
            </div>

            <h2 className="text-4xl font-black text-center tracking-tighter mb-2">Order Places!</h2>
            <p className="text-emerald-100 font-bold text-sm uppercase tracking-widest text-center max-w-xs mb-10">We have received your order and are packing the freshness!</p>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-full max-w-xs border border-white/20 mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-600">
                        <i className="fas fa-truck"></i>
                    </div>
                    <div>
                        <p className="font-black text-sm">Estimated Delivery</p>
                        <p className="text-xs text-emerald-100">Today, 45 mins</p>
                    </div>
                </div>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                </div>
                <p className="text-[10px] text-right mt-2 font-bold opacity-80">Packing...</p>
            </div>

            <button
                onClick={onContinue}
                className="bg-white text-emerald-600 px-10 py-4 rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
            >
                Continue Shopping
            </button>
        </div>
    );
};
