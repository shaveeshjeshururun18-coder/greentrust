import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onSearchFocus?: () => void;
  onLocationClick: () => void;
  onWishlistClick?: () => void;
  onFilterClick?: () => void;
  address: string;
  address: string;
  isScrolled?: boolean;
  showFilter?: boolean;
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
  showFilter = true
}) => {
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

      {/* Top Row: Location & Actions */}
      <div className={`px-4 pt-4 pb-2 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden pt-0 pb-0' : 'h-auto opacity-100'}`}>
        {/* Location / Brand */}
        <div className="flex flex-col cursor-pointer" onClick={onLocationClick}>
          <a href="/" className="flex items-center gap-2 text-[#3d4152] dark:text-white group" onClick={(e) => { e.preventDefault(); window.history.pushState({}, '', '/'); window.dispatchEvent(new PopStateEvent('popstate')); }}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm shadow-md">
              <i className="fa-solid fa-leaf"></i>
            </div>
            <h1 className="font-extrabold text-xl tracking-tight group-hover:text-green-600 transition-colors">Green Trust Grocery</h1>
            <i className="fa-solid fa-angle-down text-sm mt-1 text-green-600" aria-hidden="true"></i>
          </a>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[200px] leading-tight pl-6">
            {address || '11, Mugambigai Nagar 5th cross...'}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">





          <button
            onClick={onWishlistClick}
            aria-label="View Wishlist"
            className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 transition-colors active:scale-95"
          >
            <i className="fa-regular fa-heart text-lg font-bold" aria-hidden="true"></i>
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
    </header>
  );
};

export default Header;
