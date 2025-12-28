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
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-[3.5rem] p-10 pb-16 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] animate-slideUpModal overflow-hidden">
        {/* Background glow for flair */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-green-400/10 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-32 -translate-x-32 blur-3xl"></div>

        <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-10 relative z-10"></div>
        
        <div className="text-center mb-10 relative z-10 animate-popIn stagger-1">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-200 border-4 border-white rotate-6">
            <span className="text-white font-black text-5xl">G</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2 font-medium">Experience the freshest organic harvest</p>
        </div>

        <div className="space-y-5 relative z-10">
          <div className="animate-popIn stagger-2">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="text-gray-400 font-black tracking-widest">+91</span>
              </div>
              <input 
                type="tel" 
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="00000 00000" 
                className="w-full pl-16 pr-6 py-5 bg-gray-50 border-2 border-gray-50 group-focus-within:border-green-500 group-focus-within:bg-white rounded-[1.5rem] outline-none font-black tracking-[0.2em] text-xl transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="animate-popIn stagger-3">
            <button 
              onClick={handleLogin}
              disabled={phone.length !== 10 || isLoading}
              className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all transform active:scale-95 shadow-2xl flex items-center justify-center ${phone.length === 10 ? 'bg-green-600 text-white shadow-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'GET OTP'
              )}
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 animate-popIn stagger-4 relative z-10">
          <div className="flex-1 h-[1.5px] bg-gray-100"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Social Connect</span>
          <div className="flex-1 h-[1.5px] bg-gray-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-8 animate-popIn stagger-5 relative z-10">
          <button className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-50 rounded-[1.5rem] hover:bg-gray-50 hover:border-gray-200 transition-all active-pop shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
            <span className="text-sm font-black text-gray-700 uppercase tracking-tighter">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-50 rounded-[1.5rem] hover:bg-gray-50 hover:border-gray-200 transition-all active-pop shadow-sm">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-6 h-6" alt="FB" />
            <span className="text-sm font-black text-gray-700 uppercase tracking-tighter">Facebook</span>
          </button>
        </div>

        <p className="mt-12 text-[10px] text-center text-gray-400 leading-relaxed font-bold animate-fadeIn stagger-5 relative z-10">
          SECURE ENCRYPTED LOGIN • <span className="text-green-600 underline cursor-pointer">PRIVACY POLICY</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;