
import React, { useState } from 'react';

interface HeaderProps {
  onProfileClick: () => void;
  onSearchChange: (val: string) => void;
  onLocationClick: () => void;
  address: string;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, onSearchChange, onLocationClick, address }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearchChange(val);
  };

  return (
    <header className="sticky top-0 z-[60] glass border-b-0 px-6 pt-6 pb-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={onLocationClick}>
          <div className="w-11 h-11 bg-green-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-100 group-active:scale-110 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-gray-900 line-clamp-1 max-w-[180px] group-hover:text-green-600 transition-colors">{address || 'Select Location'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Delivery Point</p>
          </div>
        </div>
        
        <button 
          onClick={onProfileClick}
          className="w-12 h-12 rounded-[1.25rem] bg-white p-1 shadow-2xl transition-all active-pop border-2 border-green-500 overflow-hidden relative group"
        >
          <img 
            src="https://picsum.photos/seed/user/100/100" 
            alt="User" 
            className="w-full h-full object-cover rounded-[1rem] group-hover:scale-110 transition-transform"
          />
        </button>
      </div>

      <div className="relative animate-fadeIn stagger-2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          className="block w-full pl-12 pr-14 py-4 bg-gray-100/50 border-none rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:ring-4 focus:ring-green-500/10 focus:bg-white transition-all outline-none"
          placeholder='Search "Fresh Tomatoes"'
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
           <div className="h-4 w-[1px] bg-gray-300"></div>
           <button className="text-green-600 transition-all hover:scale-125 active-pop">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
