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
      setAddress('42, Vivekananda Nagar, 4th Cross Street, Ambattur, Chennai 600058');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleMove = () => {
    if (Math.random() > 0.95) {
      const houseNo = Math.floor(Math.random() * 200) + 1;
      const street = ['Main Road', 'Gandhi Street', 'Temple View', 'Park Avenue', 'Green Lane'][Math.floor(Math.random() * 5)];
      setAddress(`${houseNo}, ${street}, Vivekananda Nagar, Chennai 600058`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-fadeIn max-w-md mx-auto">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex items-center gap-4 bg-gradient-to-b from-white/95 via-white/80 to-transparent">
        <button onClick={onBack} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center active-pop border border-slate-50">
          <i className="fa-solid fa-chevron-left text-slate-900"></i>
        </button>
        <div className="flex-1 bg-white rounded-[1.5rem] p-4 shadow-2xl flex items-center gap-4 border border-slate-50">
          <i className="fa-solid fa-magnifying-glass text-slate-300 text-sm"></i>
          <input
            type="text"
            placeholder="Search for area or street..."
            className="flex-1 text-sm outline-none font-bold text-slate-800 placeholder:text-slate-300 bg-transparent"
          />
        </div>
      </div>

      {/* Map Simulation */}
      <div
        className="flex-1 relative bg-slate-200 overflow-hidden cursor-move"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Animated Pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -mt-20 group">
            <div className="animate-bounce flex flex-col items-center">
              <div className="bg-emerald-600 w-12 h-12 rounded-full shadow-2xl shadow-emerald-200 border-4 border-white flex items-center justify-center">
                <i className="fa-solid fa-location-dot text-white text-xl"></i>
              </div>
              <div className="w-1 h-6 bg-emerald-600/30 blur-[0.5px]"></div>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/5 rounded-full blur-[2px] animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-white p-8 pb-14 rounded-t-[4rem] shadow-2xl relative z-20 animate-popIn border-t border-slate-100">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>

        <div className="flex items-start gap-6 mb-12">
          <div className="w-16 h-16 bg-emerald-50 rounded-[2rem] flex items-center justify-center flex-shrink-0 animate-pulse-soft">
            <i className="fa-solid fa-map-location-dot text-emerald-600 text-2xl"></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-slate-900 text-2xl tracking-tighter mb-2">Set Delivery Area</h3>
            <div className="space-y-1">
              <p className="text-slate-900 font-extrabold leading-tight text-lg">{address.split(', ').slice(0, 1)}</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{address.split(', ').slice(1).join(', ')}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => { setIsConfirming(true); setTimeout(() => onConfirm(address), 800); }}
          className="w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest bg-emerald-600 text-white shadow-2xl shadow-emerald-500/20 transition-all active-pop flex items-center justify-center gap-4"
        >
          {isConfirming ? (
            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Confirm & Continue
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;