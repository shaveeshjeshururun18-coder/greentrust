
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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center justify-around px-2 py-2 z-50 max-w-md mx-auto shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300">
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
        view="wishlist"
        label="Favorites"
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'wishlist' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        }
      />
      <NavItem
        view="basketbuddy"
        label="BasketBuddy"
        icon={
          /* Robot/AI Icon replaced with uploaded Basket Icon */
          <img
            src="/basket_icon.png"
            alt="BasketBuddy"
            className={`w-6 h-6 object-contain transition-all ${currentView === 'basketbuddy' ? 'drop-shadow-md brightness-110' : 'grayscale opacity-60'}`}
          />
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
