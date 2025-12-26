import React from 'react';

interface AccountScreenProps {
    onLogout: () => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onViewWishlist: () => void;
    points?: number;
    onEnterAdmin?: () => void;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({ onLogout, isDarkMode, toggleDarkMode, onViewWishlist, points = 0, onEnterAdmin }) => {
    return (
        <div className="px-5 mt-6 animate-in slide-in-from-right duration-500 pb-10">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">My <span className="text-emerald-600">Profile</span></h2>
                <button
                    onClick={onEnterAdmin}
                    className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    onContextMenu={(e) => { e.preventDefault(); onEnterAdmin && onEnterAdmin(); }}
                    title="Admin Mode"
                >
                    <i className="fas fa-cog text-xl"></i>
                </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg shadow-slate-200 dark:shadow-none">
                    <i className="fas fa-user text-4xl text-slate-400 dark:text-slate-500"></i>
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Guest User</h3>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Ambattur, Chennai</p>
                </div>
            </div>

            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[2rem] p-6 text-white shadow-xl shadow-emerald-500/20 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-1">Green Points Balance</p>
                        <p className="text-4xl font-black tracking-tight">{points}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        <i className="fas fa-leaf text-white"></i>
                    </div>
                </div>
                <p className="text-xs font-medium opacity-90">Earn 2% back on every order. Use points to save on your next bill!</p>
            </div>

            <div className="space-y-4">
                <Section title="My Orders">
                    <MenuItem icon="fa-box" label="Active Orders" badge="2" />
                    <MenuItem icon="fa-history" label="Order History" />
                    <MenuItem icon="fa-rotate-left" label="Returns" />
                </Section>

                <Section title="Saved">
                    <MenuItem icon="fa-heart" label="Wishlist" toggle={false} onClick={onViewWishlist} />
                    <MenuItem icon="fa-location-dot" label="Addresses" />
                </Section>

                <Section title="Settings">
                    <MenuItem icon="fa-bell" label="Notifications" toggle />
                    <MenuItem
                        icon="fa-moon"
                        label="Dark Mode"
                        toggle
                        isActive={isDarkMode}
                        onToggle={toggleDarkMode}
                    />
                    <MenuItem icon="fa-headset" label="Help & Support" />
                </Section>
            </div>

            <button
                onClick={onLogout}
                className="w-full mt-8 py-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
            >
                Log Out
            </button>
        </div>
    );
};

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-3 ml-1">{title}</h4>
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
            {children}
        </div>
    </div>
);

const MenuItem: React.FC<{ icon: string, label: string, badge?: string, toggle?: boolean, isActive?: boolean, onToggle?: () => void, onClick?: () => void }> = ({ icon, label, badge, toggle, isActive, onToggle, onClick }) => (
    <button onClick={toggle ? onToggle : onClick} className="w-full flex items-center justify-between p-4 border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-left group">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                <i className={`fas ${icon} `}></i>
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{label}</span>
        </div>
        {badge && <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-1 rounded-lg">{badge}</span>}
        {toggle && (
            <div className={`w - 10 h - 6 rounded - full relative transition - colors duration - 300 ${isActive ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-600'} `}>
                <div className={`absolute top - 1 w - 4 h - 4 bg - white rounded - full shadow - sm transition - transform duration - 300 ${isActive ? 'left-5' : 'left-1'} `}></div>
            </div>
        )}
        {!badge && !toggle && <i className="fas fa-chevron-right text-slate-300 dark:text-slate-600 text-xs"></i>}
    </button>
);
