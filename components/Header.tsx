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
  showBack?: boolean;
  onBack?: () => void;
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

  searchValue: externalSearchValue,
  showBack = false,
  onBack
}) => {
  const [searchValue, setSearchValue] = useState(externalSearchValue || '');

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isVegMode, setIsVegMode] = useState(false);
  const [isListening, setIsListening] = useState(false);

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

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice search is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      onSearchChange(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Voice search error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <header className="relative z-[60] bg-white dark:bg-slate-900 transition-all duration-300">

      {/* Top Row: Brand & Location & Profile (Collapses on Scroll) */}
      <div
        className={`w-full bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 ease-in-out border-b border-transparent ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
          }`}
      >
        <div className="flex items-center justify-between px-4 pt-3 pb-1 gap-4">
          <div className="flex flex-col flex-1" onClick={onLocationClick}>
            <h1 className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1 flex items-center gap-2">
              Green Trust Grocery <i className="fa-solid fa-leaf text-green-500 text-xs"></i>
            </h1>
            <div className="flex items-center gap-1.5 cursor-pointer max-w-fit">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                {address === 'Detecting location...' ? 'Select Location' : address}
              </span>
              <i className="fa-solid fa-caret-down text-[10px] text-slate-400"></i>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <i className={`fa-solid ${isDarkMode ? 'fa-sun text-yellow-500' : 'fa-moon text-blue-500'} text-xs`}></i>
          </button>

          {/* Wishlist */}
          <button
            onClick={onWishlistClick}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors group"
          >
            <i className="fa-regular fa-heart text-xs text-red-500 group-hover:scale-110 transition-transform"></i>
          </button>

          {/* Profile */}
          <button
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center transition-colors group"
          >
            <i className="fa-regular fa-user text-sm text-green-600 group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>

      {/* Bottom Row: Search Bar (Always Visible) */}
      {/* Sticky Background: Pastel Green on Scroll */}
      <div className={`px-4 pb-3 pt-2 shadow-sm border-b transition-colors duration-300 ${isScrolled
        ? 'bg-[#E8F5E9]/95 dark:bg-slate-900/95 border-green-100 dark:border-slate-800 backdrop-blur-md' // Pastel Green on Scroll
        : 'bg-white dark:bg-slate-900 border-slate-50 dark:border-slate-800'
        }`}>
        <div className="flex items-center gap-3 w-full">
          {showBack && (
            <button onClick={onBack} className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white active:scale-90 transition-transform">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          )}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchValue || ''}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='Search "eggs"'
              className={`w-full h-11 border rounded-xl pl-11 pr-4 text-sm font-medium outline-none transition-all shadow-sm placeholder:text-slate-400 ${isScrolled
                ? 'bg-white dark:bg-slate-800 border-green-200 dark:border-slate-700 focus:border-green-500' // White input on Pastel bg
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-green-500'
                }`}
            />
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-px h-5 bg-slate-200 dark:bg-slate-700"></div>
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-0 top-0 bottom-0 px-4 flex items-center justify-center transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}
            >
              <i className={`fa-solid ${isListening ? 'fa-microphone-lines' : 'fa-microphone'}`}></i>
            </button>
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;
