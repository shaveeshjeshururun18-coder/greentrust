import React from 'react';

interface OrderTrackingProps {
    onBack: () => void;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ onBack }) => {
    const steps = [
        { id: 1, title: 'Order Placed', time: '10:30 AM', status: 'completed', icon: 'fa-box-open' },
        { id: 2, title: 'Preparing', time: '10:35 AM', status: 'completed', icon: 'fa-utensils' },
        { id: 3, title: 'On the Way', time: 'Now', status: 'active', icon: 'fa-motorcycle' },
        { id: 4, title: 'Delivered', time: 'Est. 10:50 AM', status: 'pending', icon: 'fa-house-circle-check' },
    ];

    return (
        <div className="flex flex-col h-full bg-slate-50 animate-fadeIn min-h-screen">
            <div className="bg-white/80 backdrop-blur-xl px-6 py-8 flex items-center gap-4 sticky top-0 z-20 border-b border-slate-100">
                <button onClick={onBack} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center active-pop">
                    <i className="fa-solid fa-chevron-left text-slate-900"></i>
                </button>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Order Tracking</h1>
            </div>

            <div className="p-6 space-y-8 pb-32">
                {/* Active Delivery Card */}
                <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden animate-popIn">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
                    <div className="relative z-10 flex justify-between items-start mb-8">
                        <div>
                            <p className="text-emerald-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Estimated Arrival</p>
                            <h3 className="text-4xl font-black tracking-tighter">15 Mins</h3>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">ID #GT-9921</p>
                        </div>
                    </div>

                    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                        <div className="absolute inset-y-0 left-0 bg-emerald-500 w-[65%] rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse-soft"></div>
                    </div>
                    <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Rider is 1.2km away from your garden</p>
                </div>

                {/* Rider Info */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-slate-100 border border-slate-50 flex items-center gap-5 animate-popIn stagger-1">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl overflow-hidden shadow-inner">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Rider" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-black text-slate-900">Felix Morgan</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organic Delivery Partner</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 active-pop">
                            <i className="fa-solid fa-phone"></i>
                        </button>
                        <button className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 active-pop">
                            <i className="fa-solid fa-message"></i>
                        </button>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-[3rem] p-8 shadow-xl shadow-slate-100 border border-slate-50 space-y-10 animate-popIn stagger-2">
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Delivery Timeline</h3>
                    <div className="space-y-12 relative">
                        <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-slate-100"></div>

                        {steps.map((step, idx) => (
                            <div key={step.id} className="flex gap-6 relative z-10">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${step.status === 'completed' ? 'bg-emerald-500 text-white shadow-emerald-100' :
                                        step.status === 'active' ? 'bg-emerald-100 text-emerald-600 border-2 border-emerald-500 animate-pulse' :
                                            'bg-slate-50 text-slate-300 border-2 border-slate-100'
                                    }`}>
                                    <i className={`fa-solid ${step.icon} text-lg`}></i>
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className={`font-black tracking-tight ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>{step.title}</h4>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.time}</span>
                                    </div>
                                    <p className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${step.status === 'completed' ? 'text-emerald-500' : step.status === 'active' ? 'text-blue-500' : 'text-slate-200'}`}>
                                        {step.status === 'completed' ? 'Successful' : step.status === 'active' ? 'In Progress' : 'Pending'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
