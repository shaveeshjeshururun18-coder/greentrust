
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface OrderSuccessViewProps {
    onContinueShopping: () => void;
    onTrackOrder?: () => void;
    orderData?: any;
}

const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ onContinueShopping, onTrackOrder, orderData }) => {
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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    // Generate order ID from timestamp
    const orderId = orderData?.createdAt ? `GT${Date.now().toString().slice(-8)}` : 'GT' + Math.random().toString(36).substr(2, 8).toUpperCase();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex flex-col items-center p-4 md:p-8 animate-fadeIn relative overflow-hidden pb-24">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-100/30 dark:bg-green-900/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 dark:bg-blue-900/10 blur-[100px] rounded-full"></div>

            <div className="relative z-10 max-w-2xl w-full">
                {/* Truck Animation Container */}
                <div className="truck-container mb-6 relative h-32 flex items-end justify-center overflow-visible">
                    <div className="truck-wrapper relative z-10">
                        {/* Speed Lines */}
                        <div className="absolute top-1/2 -left-20 w-16 h-1 bg-gradient-to-l from-green-500/50 to-transparent speed-lines"></div>
                        <div className="absolute top-1/4 -left-24 w-12 h-0.5 bg-gradient-to-l from-green-400/30 to-transparent speed-lines" style={{ animationDelay: '0.2s' }}></div>

                        <svg width="160" height="100" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                            <g className="truck-body">
                                <path d="M16 40 H140 V90 H16 Z" fill="#16a34a" />
                                <path d="M140 60 H180 L190 90 H140 Z" fill="#22c55e" />
                                <path d="M140 40 H160 V60 H140 Z" fill="#15803d" />
                                <rect x="30" y="50" width="90" height="30" rx="4" fill="white" fillOpacity="0.9" />
                                <text x="75" y="70" textAnchor="middle" fill="#166534" fontSize="10" fontFamily="sans-serif" fontWeight="900" letterSpacing="0.5">GREEN TRUST</text>
                                <path d="M145 65 H175 L180 85 H145 Z" fill="#bfdbfe" />
                            </g>
                            <g className="truck-wheel" style={{ transformBox: 'fill-box', transformOrigin: '40px 90px' }}>
                                <circle cx="40" cy="90" r="14" fill="#333" />
                                <circle cx="40" cy="90" r="6" fill="#777" />
                                <path d="M40 76 V104 M26 90 H54" stroke="#555" strokeWidth="2" />
                            </g>
                            <g className="truck-wheel" style={{ transformBox: 'fill-box', transformOrigin: '160px 90px' }}>
                                <circle cx="160" cy="90" r="14" fill="#333" />
                                <circle cx="160" cy="90" r="6" fill="#777" />
                                <path d="M160 76 V104 M146 90 H174" stroke="#555" strokeWidth="2" />
                            </g>
                        </svg>
                        <div className="absolute bottom-0 left-[-20%] right-[-20%] h-4 bg-green-500/20 blur-xl rounded-full"></div>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-black mb-2 animate-popIn stagger-1 leading-tight bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                        Order Confirmed!
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">Order ID: <span className="text-green-600">{orderId}</span></p>
                </div>

                {orderData && (
                    <>
                        {/* Order Items Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-4 border border-slate-200 dark:border-slate-800 shadow-lg animate-popIn stagger-2">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-shopping-bag text-green-600"></i>
                                Order Summary
                            </h3>
                            <div className="space-y-3">
                                {orderData.items && orderData.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-start py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{item.name}</p>
                                            <p className="text-xs text-slate-500">{item.weight} × {item.quantity}</p>
                                        </div>
                                        <p className="font-black text-sm text-slate-800 dark:text-slate-200">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-4 border border-slate-200 dark:border-slate-800 shadow-lg animate-popIn stagger-3">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <i className="fa-solid fa-receipt text-green-600"></i>
                                Bill Details
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">₹{orderData.amount?.subtotal?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Delivery Fee</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">₹{orderData.amount?.deliveryFee?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600 dark:text-slate-400">Handling Fee</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">₹{orderData.amount?.handlingFee?.toFixed(2) || '0.00'}</span>
                                </div>
                                <div className="flex justify-between pt-2 border-t-2 border-green-500 mt-2">
                                    <span className="font-black text-slate-900 dark:text-white">Total Amount</span>
                                    <span className="font-black text-lg text-green-600">₹{orderData.amount?.total?.toFixed(2) || '0.00'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delivery & Payment Info */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 mb-4 border border-slate-200 dark:border-slate-800 shadow-lg animate-popIn stagger-4">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-location-dot text-green-600"></i>
                                        Delivery Address
                                    </h4>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{orderData.address || 'Not specified'}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <i className="fa-solid fa-credit-card text-green-600"></i>
                                        Payment Method
                                    </h4>
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{orderData.paymentMethod?.toUpperCase() || 'COD'}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

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
                            View All Orders
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
