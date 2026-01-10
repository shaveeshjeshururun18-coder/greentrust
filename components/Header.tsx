import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onSearchFocus?: () => void;
  onLocationClick: () => void;
  onWishlistClick?: () => void;
  onFilterClick?: () => void;
  address: string;
  isScrolled?: boolean;
  showFilter?: boolean;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  searchValue?: string;
}

const SEARCH_PLACEHOLDERS = [
  "Search 'Biryani'",
  "Search 'Pizza'",
  "Search 'Fresh Vegetables'",
  "Search 'Cold Drinks'",
  "Search 'Ice Cream'",
  "Search 'Dosa'"
];

const Header: React.FC<HeaderProps> = ({
  onProfileClick,
  onSearchChange,
  onSearchFocus,
  onLocationClick,
  onWishlistClick,
  onFilterClick,
  address,
  isScrolled = false,
  showFilter = true,
  isDarkMode = false,
  toggleDarkMode,
  searchValue: externalSearchValue
}) => {
  const [searchValue, setSearchValue] = useState(externalSearchValue || '');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVegMode, setIsVegMode] = useState(false);

  // Sync with external search value (e.g. when cleared by App)
  useEffect(() => {
    if (externalSearchValue !== undefined) {
      setSearchValue(externalSearchValue);
    }
  }, [externalSearchValue]);

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

      {/* Top Row: Location & Actions */}
      <div className={`px-4 pt-4 pb-2 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden pt-0 pb-0' : 'h-auto opacity-100'}`}>
        {/* Location / Brand */}
        <div className="flex flex-col cursor-pointer group" onClick={onLocationClick}>
          <a href="/" className="flex items-center gap-2 text-[#3d4152] dark:text-white" onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h1 className="font-extrabold text-xl tracking-tight group-hover:text-green-600 transition-colors">Green Trust Grocery</h1>
          </a>

          {/* Address Display - More Prominent */}
          <div className="flex items-center gap-2 mt-1 pl-10 group-hover:text-green-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-bold truncate max-w-[180px] leading-tight">
              {address || 'Tap to set location'}
            </p>
            <i className="fa-solid fa-pen-to-square text-[10px] text-green-600"></i>
          </div>
        </div>


        {/* Right Actions */}
        <div className="flex items-center gap-3">





          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            {/* Theme Toggle Button - Livelier & Smaller */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 dark:from-slate-700 dark:to-slate-900 flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 active-rotate transition-all duration-300 group overflow-hidden relative"
              aria-label="Toggle Theme"
            >
              <div className="relative z-10">
                {isDarkMode ? (
                  <i className="fa-solid fa-sun text-yellow-100 text-sm animate-spin-slow"></i>
                ) : (
                  <i className="fa-solid fa-moon text-white text-sm group-hover:-rotate-12 transition-transform"></i>
                )}
              </div>
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>

            <button
              onClick={onWishlistClick}
              className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-rose-500 hover:bg-white transition-all shadow-md active:scale-95"
            >
              <i className="fa-regular fa-heart text-base"></i>
            </button>

            <button
              onClick={onProfileClick}
              aria-label="View Profile"
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
              aria-label="Search Products"
            />
            <div className="absolute left-0 top-0 h-full w-12 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <i className="fa-solid fa-magnifying-glass text-green-600 text-lg"></i>
            </div>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-3">
              {searchValue && (
                <button onClick={() => { setSearchValue(''); onSearchChange(''); }} className="text-slate-400" aria-label="Clear Search">
                  <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                </button>
              )}
              {/* Microphone Removed */}
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

          {/* Filter Button (Mobile/Desktop) - Conditionally Rendered */}
          {showFilter && (
            <button
              onClick={onFilterClick}
              aria-label="Filter Products"
              className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 active:scale-95 transition-all"
            >
              <i className="fa-solid fa-sliders text-lg" aria-hidden="true"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
