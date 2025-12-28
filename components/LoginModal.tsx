import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-md mx-auto">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fadeIn" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-[4rem] p-10 pb-16 shadow-2xl animate-popIn overflow-hidden border-t border-slate-100">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-500/5 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>

        <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10 relative z-10"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-100 border-4 border-white rotate-3">
            <i className="fa-solid fa-leaf text-white text-4xl"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Green Trust</h2>
          <p className="text-slate-400 text-sm mt-3 font-medium uppercase tracking-[0.2em]">Purity At Your Doorstep</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <span className="text-slate-400 font-black tracking-widest text-sm">+91</span>
              </div>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Mobile Number"
                className="w-full pl-16 pr-6 py-6 bg-slate-50 border-2 border-slate-50 group-focus-within:border-emerald-500 group-focus-within:bg-white rounded-[2rem] outline-none font-black tracking-widest text-lg transition-all shadow-inner"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={phone.length !== 10 || isLoading}
            className={`w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] transition-all transform active-pop shadow-2xl flex items-center justify-center ${phone.length === 10 ? 'bg-emerald-600 text-white shadow-emerald-100' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Get Started'
            )}
          </button>
        </div>

        <div className="mt-12 flex items-center gap-4 relative z-10 px-4">
          <div className="flex-1 h-[1.5px] bg-slate-100"></div>
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Secure Connect</span>
          <div className="flex-1 h-[1.5px] bg-slate-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-8 relative z-10">
          <button className="flex items-center justify-center gap-4 py-5 bg-white border-2 border-slate-50 rounded-[2rem] hover:bg-slate-50 transition-all active-pop shadow-sm">
            <i className="fa-brands fa-google text-slate-400 text-xl"></i>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Google</span>
          </button>
          <button className="flex items-center justify-center gap-4 py-5 bg-white border-2 border-slate-50 rounded-[2rem] hover:bg-slate-50 transition-all active-pop shadow-sm">
            <i className="fa-brands fa-apple text-slate-400 text-xl"></i>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Apple</span>
          </button>
        </div>

        <p className="mt-12 text-[9px] text-center text-slate-300 leading-relaxed font-black uppercase tracking-widest relative z-10">
          By signing in you agree to our <span className="text-emerald-600 cursor-pointer">Terms</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;