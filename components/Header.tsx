import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
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

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchChange, onLocationClick, onWishlistClick, address, isDark, toggleTheme, isScrolled = false }) => {
  const [searchValue, setSearchValue] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVegMode, setIsVegMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  return (
    <header className={`sticky top-0 z-[60] bg-white dark:bg-[#120f26] transition-all duration-300 ${isScrolled ? 'shadow-md pb-2' : 'pb-4'}`}>
      {/* Top Row: Location & Actions */}
      <div className={`px-4 pt-4 pb-2 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden pt-0 pb-0' : 'h-auto opacity-100'}`}>
        {/* Location */}
        <div className="flex flex-col cursor-pointer" onClick={onLocationClick}>
          <div className="flex items-center gap-1.5 text-[#3d4152] dark:text-white group">
            <i className="fa-solid fa-location-dot text-orange-500 text-lg"></i>
            <span className="font-extrabold text-lg tracking-tight group-hover:text-orange-500 transition-colors">Home</span>
            <i className="fa-solid fa-angle-down text-sm mt-1"></i>
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
            className="w-full h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pl-10 pr-10 text-sm font-semibold outline-none focus:border-orange-500 transition-colors dark:text-white"
            placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
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
          className={`flex flex-col items-center justify-center h-12 min-w-[3.5rem] rounded-xl border transition-all active:scale-95 ${isVegMode ? 'bg-green-50 border-green-500' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'}`}
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
