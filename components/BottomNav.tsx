
import React from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, cartCount }) => {
  const NavItem = ({ view, label, icon }: { view: ViewState, label: string, icon: React.ReactNode }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full py-2 transition-all ${currentView === view ? 'text-green-600 transform scale-105' : 'text-gray-400'}`}
    >
      <div className="relative">
        {icon}
        {view === 'wallet' && (
          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[8px] px-1 rounded-md font-bold">₹0</div>
        )}
      </div>
      <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{label}</span>
      {currentView === view && <div className="w-1 h-1 bg-green-600 rounded-full mt-0.5"></div>}
    </button>
  );

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 pb-6 pt-2 z-50 max-w-md mx-auto shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
      <NavItem 
        view="home" 
        label="Home" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'home' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        } 
      />
      <NavItem 
        view="categories" 
        label="Items" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'categories' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        } 
      />
      <NavItem 
        view="wallet" 
        label="Wallet" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'wallet' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        } 
      />
      <NavItem 
        view="orders" 
        label="Orders" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'orders' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        } 
      />
      <NavItem 
        view="account" 
        label="Account" 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'account' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        } 
      />
    </nav>
  );
};

export default BottomNav;
