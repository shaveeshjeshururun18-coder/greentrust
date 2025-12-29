import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onSearchFocus?: () => void;
  onLocationClick: () => void;
  onWishlistClick?: () => void;
  address: string;
  isDark?: boolean;
  toggleTheme?: () => void;
  isScrolled?: boolean;
}

const SEARCH_PLACEHOLDERS = [
  "Search 'Biryani'",
  "Search 'Pizza'",
  "Search 'Fresh Vegetables'",
  "Search 'Cold Drinks'",
  "Search 'Ice Cream'",
  "Search 'Dosa'"
];

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchChange, onSearchFocus, onLocationClick, onWishlistClick, address, isDark, toggleTheme, isScrolled = false }) => {
  const [searchValue, setSearchValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVegMode, setIsVegMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-[#120f26]/95 backdrop-blur-md shadow-md pb-2' : 'bg-transparent pb-4'}`}>

      {/* Animated Background Layer (Disappears on Scroll) */}
      <div
        className="absolute inset-x-0 top-0 h-[140%] z-[-1] overflow-hidden pointer-events-none transition-opacity duration-300"
        style={{ opacity: isScrolled ? 0 : 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/90 via-white/80 to-transparent dark:from-slate-800/90 dark:via-slate-900/80"></div>
        {/* City Skyline / Fresh Pattern Mock */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-15 bg-repeat-x animate-slideSlow"
          style={{
            backgroundImage: "url('https://cdn-icons-png.flaticon.com/512/2942/2942544.png')",
            backgroundSize: 'contain',
            backgroundPosition: 'bottom'
          }}
        ></div>
      </div>

      {/* Top Row: Location & Actions */}
      <div className={`px-4 pt-4 pb-2 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden pt-0 pb-0' : 'h-auto opacity-100'}`}>
        {/* Location */}
        <div className="flex flex-col cursor-pointer" onClick={onLocationClick}>
          <div className="flex items-center gap-2 text-[#3d4152] dark:text-white group">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <span className="font-extrabold text-xl tracking-tight group-hover:text-green-600 transition-colors">Green Trust</span>
            <i className="fa-solid fa-angle-down text-sm mt-1 text-green-600"></i>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] leading-tight pl-6">
            {address || '11, Mugambigai Nagar 5th cross...'}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 transition-colors"
          >
            <i className={`fa-solid ${isDark ? 'fa-sun text-yellow-500' : 'fa-moon'}`}></i>
          </button>

          <button
            onClick={onWishlistClick}
            className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 transition-colors active:scale-95"
          >
            <i className="fa-regular fa-heart text-lg font-bold"></i>
          </button>

          <button
            onClick={onProfileClick}
            className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm"
          >
            <img src="https://picsum.photos/seed/user/100/100" alt="User" className="w-full h-full object-cover" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Search & Veg Toggle */}
      <div className={`px-4 flex items-center gap-3 transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-2'}`}>
        {/* Search Bar */}
        <div className="flex-1 relative shadow-sm">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            className="w-full h-12 rounded-xl bg-green-50 dark:bg-slate-800 border-none pl-12 pr-10 text-sm font-semibold outline-none focus:ring-2 focus:ring-green-500/50 transition-colors text-slate-800 dark:text-white placeholder-slate-400/80"
            placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
          />
          <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-green-600 text-lg"></i>
          </div>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-3">
            {searchValue && (
              <button onClick={() => { setSearchValue(''); onSearchChange(''); }} className="text-slate-400">
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
            <div className="h-4 w-[1px] bg-slate-300"></div>
            <i className="fa-solid fa-microphone text-orange-500"></i>
          </div>
        </div>

        {/* Veg Toggle */}
        <button
          onClick={() => setIsVegMode(!isVegMode)}
          className={`hidden md:flex flex-col items-center justify-center h-12 min-w-[3.5rem] rounded-xl border transition-all active:scale-95 ${isVegMode ? 'bg-green-50 border-green-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
        >
          <span className={`text-[9px] font-bold uppercase mb-0.5 ${isVegMode ? 'text-green-700' : 'text-slate-400'}`}>VEG</span>
          <div className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${isVegMode ? 'bg-green-600' : 'bg-slate-300'}`}>
            <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${isVegMode ? 'translate-x-4' : 'translate-x-0'}`}>
              {isVegMode && <div className="w-1.5 h-1.5 bg-green-600 rounded-full m-auto mt-[3px]"></div>}
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
