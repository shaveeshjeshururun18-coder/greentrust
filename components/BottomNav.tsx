
import React, { useState } from 'react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, cartCount }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const NavItem = ({ view, label, icon, onClick }: { view?: ViewState, label: string, icon: React.ReactNode, onClick?: () => void }) => (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else if (view) {
          setCurrentView(view);
        }
      }}
      className={`flex flex-col items-center justify-center w-full py-2 transition-all ${currentView === view ? 'text-green-600 transform scale-105' : 'text-gray-400'}`}
    >
      <div className="relative">
        {icon}
      </div>
      <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">{label}</span>
      {currentView === view && <div className="w-1 h-1 bg-green-600 rounded-full mt-0.5"></div>}
    </button>
  );

  const MoreMenuItem = ({ view, label, icon, description }: { view: ViewState, label: string, icon: React.ReactNode, description: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setShowMoreMenu(false);
      }}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
    >
      <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
        {icon}
      </div>
      <div className="flex-1 text-left">
        <p className="font-black text-sm text-gray-900 dark:text-white">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <i className="fa-solid fa-chevron-right text-gray-400"></i>
    </button>
  );

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex items-center justify-around px-2 py-2 z-50 max-w-md mx-auto shadow-[0_-5px_15px_rgba(0,0,0,0.05)] transition-colors duration-300">
        <NavItem
          view="home"
          label="Shop"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'home' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        />
        <NavItem
          view="all-categories"
          label="Categories"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'all-categories' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          }
        />
        <NavItem
          view="orders"
          label="Orders"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={currentView === 'orders' ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
        <NavItem
          label="More"
          onClick={() => setShowMoreMenu(true)}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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

      {/* More Menu Modal */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 bg-black/60 z-[60] flex items-end justify-center md:hidden animate-fadeIn"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl p-6 animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="w-12 h-1 bg-gray-300 dark:bg-slate-700 rounded-full mx-auto mb-6"></div>

            {/* Title */}
            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-6">More Options</h3>

            {/* Menu Items */}
            <div className="space-y-2">
              <MoreMenuItem
                view="wishlist"
                label="Favorites"
                description="View your saved items"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                }
              />
              <MoreMenuItem
                view="basketbuddy"
                label="Basket Buddy"
                description="AI shopping assistant"
                icon={
                  <img
                    src="/basket_icon.png"
                    alt="BasketBuddy"
                    className="w-6 h-6 object-contain"
                  />
                }
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowMoreMenu(false)}
              className="w-full mt-6 py-3 bg-gray-100 dark:bg-slate-800 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomNav;
