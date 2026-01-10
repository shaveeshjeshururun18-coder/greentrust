import React, { useState, useEffect, useRef } from 'react';
import { auth, googleProvider } from '../firebaseConfig';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, signInWithPopup } from 'firebase/auth';
import { ALL_PRODUCTS } from '../constants';


interface LoginModalProps {

  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaWrapperRef = useRef<HTMLDivElement>(null);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoading(false);
      onLogin(); // App.tsx onAuthStateChanged will actually handle state, but we close modal
    } catch (error: any) {
      console.error("Google login failed:", error);
      setIsLoading(false);

      let message = "Google login failed. Please try again.";
      if (error.code === 'auth/unauthorized-domain') {
        message = "This domain is not authorized. Please add it in Firebase Console (Authentication > Settings > Authorized Domains).";
      } else if (error.code === 'auth/popup-closed-by-user') {
        message = "Login popup closed. Please try again.";
      } else if (error.code === 'auth/operation-not-allowed') {
        message = "Google Sign-in is not enabled in Firebase Console.";
      }

      alert(message);
    }
  };

  // Ref to store the verifier to avoid window object dependency issues
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  const initRecaptcha = () => {
    if (verifierRef.current) return verifierRef.current;

    if (recaptchaWrapperRef.current) {
      try {
        // Clear any existing instance on the window to prevent duplicates
        if (window.recaptchaVerifier) {
          try { window.recaptchaVerifier.clear(); } catch (e) { }
        }

        const verifier = new RecaptchaVerifier(auth, recaptchaWrapperRef.current, {
          'size': 'invisible',
          'callback': () => {
            // Solved
          },
          'expired-callback': () => {
            console.warn("reCAPTCHA expired");
            // Allow auto-reset on next attempt
          }
        });

        window.recaptchaVerifier = verifier; // For Firebase compatibility if needed by internal SDK
        verifierRef.current = verifier;

        verifier.render().catch(err => console.error("Render error:", err));
        return verifier;
      } catch (error) {
        console.error("Recaptcha Init Error:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // Initial setup attempt
    const timer = setTimeout(initRecaptcha, 500);
    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
      if (verifierRef.current) {
        try { verifierRef.current.clear(); } catch (e) { }
        verifierRef.current = null;
        window.recaptchaVerifier = undefined;
      }
    }
  }, []);

  const handleSendOtp = async () => {
    if (phone.length !== 10) return;
    setIsLoading(true);

    const phoneNumber = `+91${phone}`;

    // Lazy init/Get existing verifier
    let appVerifier = verifierRef.current;
    if (!appVerifier) {
      appVerifier = initRecaptcha();
    }

    if (!appVerifier) {
      setIsLoading(false);
      alert("System Error: Could not initialize security check. Please refresh and try again.");
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("SMS sent successfully");
      setConfirmationResult(confirmation);
      setShowOtpInput(true);
      setIsLoading(false);
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      setIsLoading(false);

      // Force reset verifier on error to allow retrying
      if (verifierRef.current) {
        // Don't clear completely, just reset the widget if possible
        try {
          // Re-render often fixes 'captcha check failed' state
          verifierRef.current.render().then(wid => grecaptcha.reset(wid));
        } catch (e) {
          // If reset fails, we might need to recreate
          verifierRef.current = null;
          setTimeout(initRecaptcha, 100);
        }
      }

      let msg = `Failed to send SMS. (${error.code || error.message})`;
      if (error.code === 'auth/invalid-phone-number') msg = "Invalid phone number format.";
      else if (error.code === 'auth/too-many-requests') msg = "Too many attempts. Please try again later.";
      else if (error.code === 'auth/captcha-check-failed') msg = "reCAPTCHA check failed. Please check your internet connection.";
      else if (error.code === 'auth/quota-exceeded') msg = "SMS quota exceeded. Please use Google Sign-in.";
      else if (error.message && error.message.includes('reCAPTCHA')) msg = "reCAPTCHA client error. " + error.message;

      alert(msg);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6 || !confirmationResult) return;
    setIsLoading(true);

    try {
      await confirmationResult.confirm(otp);
      // User signed in successfully.
      setIsLoading(false);
      onLogin(); // Complete the login flow in parent
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setIsLoading(false);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end max-w-md mx-auto">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-fadeIn" onClick={onClose}></div>
      <div className="relative bg-white rounded-t-[3.5rem] p-10 pb-16 shadow-[0_-20px_60px_rgba(0,0,0,0.3)] animate-slideUpModal overflow-hidden">

        {/* Invisible Recaptcha Container */}
        <div id="recaptcha-container" ref={recaptchaWrapperRef} className="absolute inset-0 pointer-events-none opacity-0"></div>

        {/* --- BACKGROUND REDUCED (Clean White) --- */}
        <div className="absolute inset-0 z-0 bg-white"></div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="absolute top-0 left-0 w-10 h-10 rounded-full bg-slate-100/50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-all z-20"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="w-16 h-1.5 bg-gray-200 rounded-full mx-auto mb-10"></div>

          <div className="text-center mb-10 relative z-10 animate-popIn stagger-1">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-700 rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-200 border-4 border-white rotate-6">
              <span className="text-white font-black text-5xl">G</span>
            </div>
            <h1 className="text-3xl font-black text-green-700 font-serif tracking-tight mb-2">Green Trust Grocery</h1>
            <h2 className="text-xl font-bold text-gray-900">{showOtpInput ? 'Verify Code' : 'Welcome Back'}</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">
              {showOtpInput ? `Enter the code sent to +91 ${phone}` : 'Experience the freshest organic harvest'}
            </p>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            {!showOtpInput ? (
              // PHONE INPUT
              <div className="animate-popIn stagger-2">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-green-700 font-black tracking-widest text-2xl">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="00000 00000"
                    className="w-full pl-20 pr-6 py-6 bg-white border-2 border-green-500 rounded-[2rem] outline-none font-black tracking-[0.2em] text-2xl transition-all shadow-[0_10px_30px_rgba(34,197,94,0.15)] focus:shadow-[0_10px_40px_rgba(34,197,94,0.25)] ring-4 ring-green-500/10 placeholder-slate-300 text-slate-800"
                  />
                </div>
              </div>
            ) : (
              // OTP INPUT
              <div className="animate-popIn stagger-2">
                <div className="relative group">
                  <input
                    type="tel"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="------"
                    className="w-full text-center py-5 bg-gray-50 border-2 border-gray-50 group-focus-within:border-green-500 group-focus-within:bg-white rounded-[1.5rem] outline-none font-black tracking-[1em] text-2xl transition-all shadow-inner placeholder:tracking-[1em]"
                  />
                </div>
                <button onClick={() => { setShowOtpInput(false); setOtp(''); }} className="mx-auto block mt-4 text-xs font-bold text-green-600 uppercase tracking-widest">Change Number</button>
              </div>
            )}

            <div className="animate-popIn stagger-3">
              <button
                onClick={showOtpInput ? handleVerifyOtp : handleSendOtp}
                disabled={isLoading || (showOtpInput ? otp.length !== 6 : phone.length !== 10)}
                className={`w-full py-5 rounded-[1.5rem] font-black text-lg transition-all transform active:scale-95 shadow-2xl flex items-center justify-center ${(showOtpInput ? otp.length === 6 : phone.length === 10) ? 'bg-green-600 text-white shadow-green-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  showOtpInput ? 'VERIFY OTP' : 'GET OTP'
                )}
              </button>
            </div>
          </div>

          {!showOtpInput && (
            <>
              <div className="mt-10 flex items-center gap-4 animate-popIn stagger-4 relative z-10">
                <div className="flex-1 h-[1.5px] bg-gray-100"></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Social Connect</span>
                <div className="flex-1 h-[1.5px] bg-gray-100"></div>
              </div>

              <div className="grid grid-cols-2 gap-5 mt-8 animate-popIn stagger-5 relative z-10">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] hover:bg-slate-50 hover:border-green-200 transition-all active:scale-95 shadow-sm group"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6 group-hover:scale-110 transition-transform" alt="Google" />
                  <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 py-4 bg-white border-2 border-slate-100 rounded-[1.5rem] hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm opacity-50 cursor-not-allowed">
                  <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-6 h-6" alt="FB" />
                  <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">Facebook</span>
                </button>
              </div>
            </>
          )}

          <p className="mt-12 text-[10px] text-center text-gray-400 leading-relaxed font-bold animate-fadeIn stagger-5 relative z-10">
            SECURE ENCRYPTED LOGIN • <span className="text-green-600 underline cursor-pointer">PRIVACY POLICY</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;