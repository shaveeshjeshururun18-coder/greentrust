import React from 'react';
import { ViewState } from '../types.ts';

interface BottomNavProps {
  currentView: ViewState;
  setCurrentView: (view: any) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView, cartCount }) => {
  const NavItem = ({ id, label, icon, badge }: { id: string, label: string, icon: string, badge?: string }) => {
    const isActive = currentView === id || (id === 'home' && currentView === 'categories');

    return (
      <button
        onClick={() => setCurrentView(id as any)}
        className={`flex flex-col items-center justify-center py-2 transition-all relative ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}
      >
        <div className={`text-xl mb-1 transition-transform ${isActive ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-110'}`}>
          <i className={`${icon}`}></i>
          {badge && (
            <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-white">
              {badge}
            </span>
          )}
        </div>
        <span className={`text-[8px] font-black uppercase tracking-widest transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 pb-8 pt-4 z-50 max-w-md mx-auto shadow-2xl">
      <NavItem id="home" label="Home" icon="fa-solid fa-house" />
      <NavItem id="food" label="Food" icon="fa-solid fa-plate-wheat" />
      <NavItem id="orders" label="Tracking" icon="fa-solid fa-bolt" badge="LIVE" />
      <NavItem id="99store" label="99 Store" icon="fa-solid fa-store" />
      <NavItem id="deal-rush" label="Deals" icon="fa-solid fa-fire-flame-curved" />
    </nav>
  );
};

export default BottomNav;
