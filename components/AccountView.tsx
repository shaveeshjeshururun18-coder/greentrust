import React, { useState } from 'react';
import Footer from './Footer';
import EditProfileModal from './EditProfileModal';

interface AccountViewProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  user: any;

  onNavigate: (view: any) => void;
  onLogoutClick: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onSupportClick: () => void;
}

const MenuLink = ({ icon, label, sub, onClick }: { icon: React.ReactNode, label: string, sub?: string, onClick?: () => void }) => (
  <div onClick={onClick} className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-slate-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
    <div className="flex items-center gap-4">
      <div className="text-green-600 dark:text-green-400">{icon}</div>
      <div>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{label}</p>
        {sub && <p className="text-[10px] text-gray-400 dark:text-gray-500">{sub}</p>}
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 dark:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </div>
);

const ToggleRow = ({ icon, label, sub, checked, onToggle }: { icon: React.ReactNode, label: string, sub?: string, checked: boolean, onToggle: () => void }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-50 dark:border-slate-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors" onClick={onToggle}>
    <div className="flex items-center gap-4">
      <div className="text-green-600 dark:text-green-400">{icon}</div>
      <div>
        <p className="text-sm font-bold text-gray-800 dark:text-white">{label}</p>
        {sub && <p className="text-[10px] text-gray-400 dark:text-gray-500">{sub}</p>}
      </div>
    </div>
    <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-green-600' : 'bg-gray-300 dark:bg-slate-700'}`}>
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
    </div>
  </div>
);

const AccountView: React.FC<AccountViewProps> = ({ onLoginClick, isLoggedIn, user, onNavigate, onLogoutClick, isDarkMode, toggleTheme, onSupportClick }) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Green Trust Grocery',
          text: 'Check out the best organic grocery store in Chennai!',
          url: window.location.origin,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.origin);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-transparent min-h-full pb-20 animate-fadeIn">
      <div className="p-8 pt-12 text-white relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(to bottom, #16a34a, #15803d)' }}>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/30 p-1 mb-4 shadow-2xl bg-white/10 backdrop-blur-md overflow-hidden">
            <img
              src={user?.photoURL || (isLoggedIn ? "https://picsum.photos/seed/greenuser/200/200" : "https://cdn-icons-png.flaticon.com/512/149/149071.png")}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          {isLoggedIn ? (
            <div className="text-center">
              <h2 className="text-xl font-black">{user?.displayName || 'Green User'}</h2>
              <p className="text-sm text-green-100 font-medium">{user?.phoneNumber || user?.email || 'Authenticated'}</p>
              <button
                onClick={() => setShowEditProfile(true)}
                className="mt-3 bg-white text-green-700 px-4 py-1.5 rounded-full font-bold text-xs uppercase shadow-lg hover:bg-green-50 active:scale-95 transition-all"
              >
                Edit Profile
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-black">Hi Guest!</h2>
              <p className="text-sm text-green-100 mb-4">Login to track orders and save more</p>
              <button
                onClick={onLoginClick}
                className="bg-white text-green-700 px-8 py-2.5 rounded-full font-black text-sm uppercase shadow-xl hover:bg-green-50 transition-all active:scale-95"
              >
                Login / Signup
              </button>
            </div>
          )}
        </div>

        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>
      </div>

      <div className="grid grid-cols-3 gap-3 p-4 mt-4 relative z-20">
        <div onClick={() => onNavigate('orders')} className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
          <div className="bg-blue-50 p-2 rounded-lg mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-800">ORDERS</span>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
          <div className="bg-purple-50 p-2 rounded-lg mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-[10px] font-black text-gray-800">REWARDS</span>
        </div>
        <div onClick={onSupportClick} className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center cursor-pointer active:scale-95 transition-transform">
          <div className="bg-amber-50 p-2 rounded-lg mb-2">
            <i className="fa-solid fa-headset text-amber-600 text-lg"></i>
          </div>
          <span className="text-[10px] font-black text-gray-800">NEED HELP?</span>
        </div>
      </div>

      <div className="mt-4 bg-white dark:bg-slate-900 mx-4 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800">
        <ToggleRow
          label="App Theme"
          sub={isDarkMode ? "Dark Mode" : "Light Mode"}
          icon={<i className={`fa-solid ${isDarkMode ? 'fa-moon' : 'fa-sun'}`}></i>}
          checked={isDarkMode}
          onToggle={toggleTheme}
        />
        <MenuLink
          label="App Language"
          sub="Current: English (Bilingual)"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.34 3 18.035" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
        />
        <MenuLink
          label="Delivery Preferences"
          sub="Contactless, Morning Slots"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
        />
        <div onClick={() => onNavigate('location-picker')}>
          <MenuLink
            label="Manage Addresses"
            icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />
        </div>

        <MenuLink
          label="Refer & Earn"
          sub="Earn ₹250 for every referral"
          icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
        />
        <MenuLink
          label="Share Website"
          sub="Spread the green love"
          icon={<i className="fa-solid fa-share-nodes"></i>}
          onClick={handleShare}
        />
        <MenuLink
          label="About Us"
          sub="Our story & mission"
          icon={<i className="fa-solid fa-store"></i>}
          onClick={() => setShowAbout(true)}
        />
        <div onClick={() => onNavigate('admin')}>
          <MenuLink
            label="Admin Dashboard"
            sub="Manage orders & products"
            icon={<i className="fa-solid fa-lock"></i>}
          />
        </div>
        <div onClick={() => onNavigate('developer')}>
          <MenuLink
            label="Developer"
            sub="Meet the mind behind Green Trust Grocery"
            icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />
        </div>
        <div onClick={onSupportClick}>
          <MenuLink
            label="Need Help?"
            sub="Chat with Basket Buddy"
            icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} /></svg>}
          />
        </div>
      </div>



      {isLoggedIn && (
        <div className="mt-4 bg-white mx-4 rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-red-50 transition-colors group" onClick={onLogoutClick}>
            <div className="flex items-center gap-4">
              <div className="text-red-500 bg-red-100 p-2 rounded-full group-hover:bg-red-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-red-500">Sign Out</p>
                <p className="text-[10px] text-red-300">Come back soon!</p>
              </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-200 group-hover:text-red-400 group-hover:translate-x-1 transition-all" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      <div className="p-8 text-center text-gray-300">
        <p className="text-xs font-bold tracking-widest uppercase mb-1">Green Trust Grocery</p>
        <p className="text-[10px]">App Version 3.4.2 (2025)</p>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>

      {showEditProfile && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditProfile(false)}
          onSave={() => {
            setShowEditProfile(false);
          }}
        />
      )}

      {/* Simple About Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn" onClick={() => setShowAbout(false)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-8 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAbout(false)} className="absolute top-4 right-4 w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-xmark text-slate-500"></i>
            </button>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🌿</div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Green Trust</h2>
              <p className="text-sm text-green-600 font-bold">Organic & Fresh</p>
            </div>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed text-center">
              <p>We are a farm-to-table organic grocery service based in Chennai, dedicated to providing chemical-free, fresh produce directly from farmers to your doorstep.</p>
              <p>Licensed & Certified for quality.</p>
            </div>
            <div className="mt-8 text-center">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">© 2025 Green Trust Grocery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountView;
