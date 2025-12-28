import React, { useState, useEffect } from 'react';

interface LocationPickerProps {
  onConfirm: (address: string) => void;
  onBack: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onConfirm, onBack }) => {
  const [address, setAddress] = useState('Locating your garden...');
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate a very detailed structured address
      setAddress('No 42, Vivekananda Nagar, 4th Cross Street, Ambattur Industrial Estate, Chennai, Tamil Nadu, 600058');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = () => {
    if (Math.random() > 0.9) {
      const houseNo = Math.floor(Math.random() * 200) + 1;
      const street = ['Main Road', 'Gandhi Street', 'Temple View', 'Park Avenue', 'Green Lane'][Math.floor(Math.random() * 5)];
      setAddress(`No ${houseNo}, ${street}, Vivekananda Nagar, Ambattur, Chennai, Tamil Nadu, 600058`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-fadeIn">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center gap-4 bg-gradient-to-b from-white/95 via-white/70 to-transparent">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center active-pop border border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 bg-white rounded-[1.5rem] p-4 shadow-2xl flex items-center gap-3 border border-gray-100">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          <input 
            type="text" 
            placeholder="Search for area or street..." 
            className="flex-1 text-sm outline-none font-bold text-gray-800 placeholder:text-gray-300"
          />
        </div>
      </div>

      {/* Map Simulation Area */}
      <div 
        className="flex-1 relative bg-[#e5e7eb] overflow-hidden cursor-move"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* SVG Grid Map Background for premium look */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Landmarks */}
        <div className="absolute top-[30%] left-[20%] w-40 h-20 bg-gray-300/30 rounded-3xl -rotate-12 border-2 border-gray-400/10"></div>
        <div className="absolute bottom-[20%] right-[10%] w-32 h-32 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-[60%] right-[30%] w-1 h-[200%] bg-gray-400/20 rotate-45"></div>

        {/* The Animated Picker Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -mt-16 group">
            <div className="animate-bounce flex flex-col items-center">
              <div className="bg-green-600 p-2 rounded-full shadow-2xl shadow-green-300 border-4 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.615 6 10 6 10s6-5.385 6-10a6 6 0 00-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="w-1 h-6 bg-green-600/50 blur-[0.5px]"></div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/10 rounded-full blur-[2px] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Address Card Redesign */}
      <div className="bg-white p-8 pb-14 rounded-t-[4rem] shadow-[0_-30px_60px_rgba(0,0,0,0.1)] relative z-20 animate-slideUpModal border-t border-gray-50">
        <div className="w-16 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
        
        <div className="flex items-start gap-5 mb-10">
          <div className="w-14 h-14 bg-green-50 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 animate-glow-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-gray-900 text-xl tracking-tight mb-2">Set Delivery Point</h3>
            <div className="space-y-1">
              <p className="text-gray-900 font-bold leading-tight">{address.split(', ').slice(0, 2).join(', ')}</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{address.split(', ').slice(2).join(', ')}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { setIsConfirming(true); setTimeout(() => onConfirm(address), 800); }}
          className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-[0_20px_40px_rgba(34,197,94,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 ${isConfirming ? 'bg-green-700' : 'bg-green-600'} text-white`}
        >
          {isConfirming ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              CONFIRM LOCATION
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;