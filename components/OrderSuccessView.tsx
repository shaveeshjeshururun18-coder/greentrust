
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface OrderSuccessViewProps {
    onContinueShopping: () => void;
    onTrackOrder?: () => void;
}

const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ onContinueShopping, onTrackOrder }) => {
    useEffect(() => {
        // Celebration confetti!
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-8 text-center animate-fadeIn relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100/30 dark:bg-green-900/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-900/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-md w-full">
                <div className="relative mb-12 inline-block">
                    <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center animate-success shadow-2xl shadow-green-200 dark:shadow-green-900/20 mx-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-red-400 rounded-full animate-pulse"></div>
                </div>

                <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 animate-popIn stagger-1">Order Confirmed!</h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-2 font-bold animate-popIn stagger-2">Thank you for choosing Green Trust Grocery.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-12 max-w-[300px] mx-auto font-medium leading-relaxed animate-popIn stagger-3">
                    Your order has been placed successfully. We'll notify you as soon as it's out for delivery!
                </p>

                {/* Order Progress / What's Next */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 mb-12 border border-slate-100 dark:border-slate-800 text-left animate-popIn stagger-4">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">What's Next?</h4>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-800 dark:text-gray-200">Confirmation</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">We've received your order and it's being verified.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 dark:text-gray-500">Processing</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Items are being picked and packed from the farm.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-6 h-6 bg-gray-200 dark:bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-400 dark:text-gray-500">On its way</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500">Fresh organic produce arriving at your doorstep.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4 animate-popIn stagger-5">
                    <button
                        onClick={onContinueShopping}
                        className="w-full bg-green-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-green-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        CONTINUE SHOPPING
                    </button>
                    <div className="flex items-center justify-center gap-6">
                        <button
                            onClick={onTrackOrder}
                            className="text-green-600 dark:text-green-400 font-black text-xs uppercase tracking-widest hover:opacity-80 transition-opacity"
                        >
                            Order Details
                        </button>
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                        <a
                            href="https://wa.me/919500245626"
                            target="_blank"
                            className="text-gray-500 dark:text-gray-400 font-black text-xs uppercase tracking-widest hover:text-green-600 transition-colors"
                        >
                            Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessView;
