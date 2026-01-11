import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';

interface DesktopHeaderProps {
    currentView: ViewState;
    setCurrentView: (view: ViewState) => void;
    onSearchChange: (val: string) => void;
    cartCount: number;
    wishlistCount: number;
    isScrolled?: boolean;
    onFilterClick?: () => void; // Added missing prop def from App.tsx usage
    isDarkMode?: boolean;
    toggleDarkMode?: () => void;
    userAddress?: string;
    onLocationClick?: () => void;
    searchValue?: string;
    isLoggedIn?: boolean;
    user?: any;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
    currentView,
    setCurrentView,
    onSearchChange,
    cartCount,
    wishlistCount,
    isScrolled,
    isDarkMode = false,
    toggleDarkMode,
    userAddress = 'Select Location',
    onLocationClick,
    searchValue: externalSearchValue,
    isLoggedIn = false,
    user
}) => {
    const [searchValue, setSearchValue] = useState(externalSearchValue || '');

    // Sync with external search value - CRITICAL FIX
    useEffect(() => {
        setSearchValue(externalSearchValue || '');
    }, [externalSearchValue]);

    // Debounce Search to prevent re-rendering App on every keystroke
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(searchValue);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue, onSearchChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <header className={`hidden md:block sticky top-0 z-[60] transition-all duration-300 font-sans ${isScrolled ? 'shadow-md' : ''}`}>
            {/* Main Header - Optimized Size */}
            <div className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300 ${isScrolled ? 'py-1.5' : 'py-2.5'}`}>
                <div className="max-w-[1920px] mx-auto px-6 flex items-center justify-between gap-6">
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



                        {/* Location Picker (New - Cartoon Style) */}
                        <div onClick={onLocationClick} className="hidden xl:flex items-center gap-2 cursor-pointer group bg-gradient-to-r from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 border-2 border-green-100 dark:border-slate-700 p-1.5 pr-4 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:border-green-300 -ml-2 max-w-[200px]">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md group-hover:animate-bounce">
                                <i className="fa-solid fa-location-dot text-sm"></i>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-wider leading-none mb-0.5 group-hover:text-green-700 transition-colors">
                                    Delivery to
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate group-hover:text-slate-900 transition-colors max-w-[120px]">
                                        {userAddress.split(',')[0]}
                                    </span>
                                    <i className="fa-solid fa-chevron-down text-[8px] text-slate-400 group-hover:rotate-180 transition-transform duration-300"></i>
                                </div>
                            </div>
                        </div>

                        {/* Categories Button */}
                        <button
                            onClick={() => setCurrentView('categories')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentView === 'categories' ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-700'}`}
                        >
                            Categories
                        </button>

                        {/* BasketBuddy Button */}
                        <button
                            onClick={() => setCurrentView('basketbuddy')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentView === 'basketbuddy' ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-700'}`}
                        >
                            <img src="/basket_buddy_logo.png" alt="Buddy" className="w-6 h-6 object-contain" />
                            BasketBuddy
                        </button>

                        {/* Orders Button */}
                        <button
                            onClick={() => setCurrentView('orders')}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${currentView === 'orders' ? 'bg-green-50 text-green-700' : 'hover:bg-slate-50 text-slate-700'}`}
                        >
                            <i className="fa-solid fa-clipboard-list"></i>
                            Orders
                        </button>
                    </div>

                    {/* Search Bar (Centered & Wide) */}
                    <div className="flex-1 max-w-2xl relative flex items-center">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={handleChange}
                            className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full pl-6 pr-14 text-sm font-semibold text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-green-500/20 transition-all ${isScrolled ? 'py-2.5' : 'py-3'}`}
                            placeholder="Search among 200+ organic products..."
                        />
                        <button className="absolute right-1.5 w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 active:scale-95 transition-all shadow-md shadow-green-600/20 z-10">
                            <i className="fa-solid fa-magnifying-glass text-sm"></i>
                        </button>
                    </div>

                    {/* Actions */}
                    {/* Actions */}
                    <div className="flex items-center gap-2">

                        {/* Account */}
                        <button
                            onClick={() => setCurrentView('account')}
                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group"
                        >
                            <div className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-colors flex items-center justify-center ${isLoggedIn ? 'border-green-500 p-0.5' : 'bg-slate-200 dark:bg-slate-700 border-transparent group-hover:border-green-500'}`}>
                                {isLoggedIn && user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt="User"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            console.error("Desktop header profile image failed to load. photoURL:", user?.photoURL);
                                            e.currentTarget.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.displayName || "User") + "&background=22c55e&color=fff&size=200";
                                        }}
                                        onLoad={() => console.log("Desktop header profile image loaded from:", user?.photoURL)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-400">
                                        {isLoggedIn && user?.displayName ? (
                                            <span className="font-bold text-xs text-slate-600">{user.displayName.charAt(0)}</span>
                                        ) : (
                                            <i className="fa-solid fa-user text-xs"></i>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={`text-left hidden lg:block ${isScrolled ? 'hidden xl:block' : ''}`}>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">
                                    {isLoggedIn ? 'Welcome' : 'Account'}
                                </p>
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none group-hover:text-green-600 transition-colors truncate max-w-[100px]">
                                        {isLoggedIn ? (user?.displayName?.split(' ')[0] || 'User') : 'Sign In'}
                                    </p>
                                    <i className="fa-solid fa-angle-down text-xs text-slate-400"></i>
                                </div>
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



                        {/* Theme Toggle */}
                        {/* Theme Toggle - Livelier */}
                        {/* Theme Toggle - Smaller & Cartoonish */}
                        <button
                            onClick={toggleDarkMode}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 dark:from-indigo-600 dark:to-purple-900 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 active:rotate-[360deg] transition-all duration-500 group relative overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            <div className="relative z-10">
                                {isDarkMode ? (
                                    <i className="fa-solid fa-sun text-yellow-100 text-sm animate-spin-slow"></i>
                                ) : (
                                    <i className="fa-solid fa-moon text-white text-sm group-hover:-rotate-12 transition-transform"></i>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
        </header >
    );
};

export default DesktopHeader;
