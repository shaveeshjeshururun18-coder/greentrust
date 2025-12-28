import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onLocationClick: () => void;
  onVoiceClick: () => void;
  address: string;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchChange, onLocationClick, onVoiceClick, address }) => {
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
    <header className={`sticky top-0 z-[60] transition-all duration-300 ${isScrolled ? 'glass py-2 px-4 shadow-lg' : 'bg-[#F2F4F7] px-6 pt-6 pb-4'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col cursor-pointer active-pop" onClick={onLocationClick}>
          <div className="flex items-center gap-1">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">8 minutes</span>
            <div className="flex gap-1">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-user text-xs text-slate-400"></i>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">HOME - {address.split(',')[0]}</span>
            <i className="fa-solid fa-caret-down text-[10px] text-slate-400"></i>
          </div>
        </div>

        <button
          onClick={onProfileClick}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transition-all active-pop border-2 border-white overflow-hidden"
        >
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky`}
            alt="User"
            className="w-full h-full object-cover"
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
