import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onLocationClick: () => void;
  onVoiceClick: () => void;
  address: string;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchChange, onLocationClick, address }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  return (
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? 'glass py-2 px-4 shadow-lg' : 'bg-white px-6 pt-6 pb-4'}`}>
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3.5 group cursor-pointer active-pop" onClick={onLocationClick}>
          <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-100 group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-slate-900 line-clamp-1 max-w-[160px] leading-tight">{address || 'Select Location'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-emerald-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Express Delivery Point</p>
          </div>
        </div>

        <button
          onClick={onProfileClick}
          className="w-11 h-11 rounded-2xl bg-white p-0.5 shadow-xl transition-all active-pop border-2 border-emerald-500 overflow-hidden relative group"
        >
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky`}
            alt="User"
            className="w-full h-full object-cover rounded-[1rem] group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      <div className="relative animate-popIn stagger-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className="block w-full pl-11 pr-14 py-3.5 bg-slate-100/60 border-none rounded-2xl text-sm font-bold placeholder-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none shadow-inner"
          placeholder='Search "Fresh Avocado"'
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <button onClick={onVoiceClick} className="text-emerald-500 transition-all hover:scale-125 active-pop">
            <i className="fa-solid fa-microphone text-lg"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
