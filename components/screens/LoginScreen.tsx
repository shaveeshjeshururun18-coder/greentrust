import React, { useState } from 'react';

interface LoginScreenProps {
    onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    const [method, setMethod] = useState<'phone' | 'email'>('phone');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-slate-900 flex flex-col animate-in fade-in duration-500">
            <div className="flex-1 flex flex-col justify-center px-8 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shadow-emerald-200 mb-8 mx-auto">
                        <i className="fas fa-leaf"></i>
                    </div>

                    <h2 className="text-3xl font-black text-center text-slate-900 dark:text-white tracking-tighter mb-2">Welcome Back</h2>
                    <p className="text-center text-slate-400 text-sm font-bold uppercase tracking-widest mb-10">Fresh Groceries to your Doorstep</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="animate-in slide-in-from-right duration-300">
                            {method === 'phone' ? (
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400 text-sm">+91</span>
                                    <input
                                        type="tel"
                                        placeholder="98765 43210"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-5 pl-14 pr-4 text-lg font-black tracking-widest focus:ring-4 focus:ring-emerald-500/20 text-slate-900 dark:text-white" autoFocus
                                    />
                                </div>
                            ) : (
                                <input
                                    type="email"
                                    placeholder="hello@example.com"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-5 px-6 text-lg font-bold focus:ring-4 focus:ring-emerald-500/20 text-slate-900 dark:text-white" autoFocus
                                />
                            )}
                        </div>

                        <button type="submit" className="w-full bg-emerald-600 text-white py-5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-emerald-200 dark:shadow-emerald-900/30 active:scale-95 transition-all">
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Or continue with</p>
                        <div className="flex gap-4 justify-center">
                            <button className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <i className="fab fa-google text-xl"></i>
                            </button>
                            <button className="w-14 h-14 rounded-2xl border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <i className="fab fa-apple text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
