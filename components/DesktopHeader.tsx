import React, { useState } from 'react';
import { ViewState } from '../types';

interface DesktopHeaderProps {
    currentView: ViewState;
    setCurrentView: (view: ViewState) => void;
    onSearchChange: (val: string) => void;
    cartCount: number;
    wishlistCount: number;
    isDark?: boolean;
    toggleTheme?: () => void;
    isScrolled?: boolean;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
    currentView,
    setCurrentView,
    onSearchChange,
    cartCount,
    wishlistCount,
    isDark,
    toggleTheme,
    isScrolled
}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        onSearchChange(val);
    };

    return (
        <header className={`hidden md:block sticky top-0 z-[60] transition-all duration-300 font-sans ${isScrolled ? 'shadow-md' : ''}`}>
            {/* Main Header */}
            <div className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="max-w-[1920px] mx-auto px-10 flex items-center justify-between gap-8">
                    {/* Logo & Categories */}
                    <div className="flex items-center gap-8">
                        {/* Logo */}
                        <div className="flex-shrink-0 cursor-pointer group" onClick={() => setCurrentView('home')}>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
                                    <i className="fa-solid fa-leaf"></i>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight group-hover:text-green-600 transition-colors">Green<span className="text-green-600">Trust</span></h1>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Organic Market</p>
                                </div>
                            </div>
                        </div>

                        {/* Categories Button */}
                        <button
                            onClick={() => setCurrentView('categories')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentView === 'categories' ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-700'}`}
                        >
                            <i className="fa-solid fa-border-all"></i>
                            Categories
                        </button>
                    </div>

                    {/* Search Bar (Centered & Wide) */}
                    <div className="flex-1 max-w-2xl relative">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleChange}
                            className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-6 pr-14 text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-500/20 transition-all ${isScrolled ? 'py-2.5' : 'py-3'}`}
                            placeholder="Search among 200+ organic products..."
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-600/20">
                            <i className="fa-solid fa-magnifying-glass text-xs"></i>
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        {toggleTheme && (
                            <button
                                onClick={toggleTheme}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
                                title="Toggle Theme"
                            >
                                <i className={`fa-solid ${isDark ? 'fa-sun text-yellow-500' : 'fa-moon'}`}></i>
                            </button>
                        )}

                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-2"></div>

                        {/* Account */}
                        <button
                            onClick={() => setCurrentView('account')}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                        >
                            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-transparent group-hover:border-green-500 transition-colors">
                                <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
                            </div>
                            <div className={`text-left hidden lg:block ${isScrolled ? 'hidden xl:block' : ''}`}>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Account</p>
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none group-hover:text-green-600 transition-colors">Sign In</p>
                            </div>
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={() => setCurrentView('wishlist')}
                            className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                        >
                            <i className="fa-regular fa-heart text-lg"></i>
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>

                        {/* Cart */}
                        <button
                            onClick={() => setCurrentView('cart')}
                            className="relative flex items-center gap-3 bg-green-50 dark:bg-slate-800 hover:bg-green-100 text-green-700 dark:text-green-400 px-4 py-2.5 rounded-full transition-all active:scale-95 ml-2"
                        >
                            <i className="fa-solid fa-basket-shopping text-lg"></i>
                            <div className={`text-left hidden lg:block ${isScrolled ? 'hidden' : ''}`}>
                                <p className="text-[10px] font-bold opacity-70 uppercase tracking-wider leading-none mb-0.5">My Cart</p>
                                <p className="text-sm font-black leading-none">{cartCount} Items</p>
                            </div>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DesktopHeader;
