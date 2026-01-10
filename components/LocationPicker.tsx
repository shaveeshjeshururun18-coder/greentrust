
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { getCurrentLocation, reverseGeocode, searchPlace } from '../services/locationService';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  onConfirm: (address: string) => void;
  onBack: () => void;
}

// Custom "Black Pin" Marker - Matches Screenshot
const LocationMarker = ({ position, setPosition, onLocationFound }: any) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);

  useMapEvents({
    dragend: async () => {
      const center = map.getCenter();
      const newPos = { lat: center.lat, lng: center.lng };
      setPosition(newPos);
      onLocationFound(newPos);
    }
  });

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none flex flex-col items-center justify-end h-20 w-20">
      {/* Tooltip Bubble */}
      <div className="bg-slate-900 text-white text-[10px] py-1.5 px-3 rounded-lg shadow-xl mb-2 whitespace-nowrap animate-bounce font-bold">
        Order will be delivered here
      </div>

      {/* Black Pin */}
      <div className="relative">
        <div className="w-4 h-4 bg-black rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-10 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-black"></div>
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-3 h-1.5 bg-black/20 blur-[1px] rounded-full"></div>
      </div>
    </div>
  );
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onConfirm, onBack }) => {
  const [address, setAddress] = useState('Detecting location...');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  // Default to Chennai - Initial Zoom 18 for street level
  const [currentCoords, setCurrentCoords] = useState({ lat: 13.0827, lng: 80.2707 });
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize
  useEffect(() => {
    handleUseCurrentLocation();
  }, []);

  // Search Debounce
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    searchTimeoutRef.current = setTimeout(async () => {
      const results = await searchPlace(searchQuery);
      setSearchResults(results);
    }, 500);
    return () => { if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current); };
  }, [searchQuery]);

  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    try {
      const coords = await getCurrentLocation();
      setCurrentCoords(coords);
      const addr = await reverseGeocode(coords.lat, coords.lng);
      setAddress(addr);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSelectSearchResult = async (result: any) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setCurrentCoords({ lat, lng });
    setAddress(result.display_name);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleDragEnd = async (pos: { lat: number, lng: number }) => {
    setCurrentCoords(pos);
    const addr = await reverseGeocode(pos.lat, pos.lng);
    setAddress(addr);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => onConfirm(address), 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col font-sans">

      {/* Top Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1001]">
        <div className="bg-white rounded-xl shadow-lg flex items-center p-3 border border-gray-100">
          <button onClick={onBack} className="mr-3 text-slate-400 hover:text-slate-800">
            <i className="fa-solid fa-arrow-left text-lg"></i>
          </button>
          <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for your area..."
            className="flex-1 outline-none text-sm font-bold text-slate-700 placeholder-slate-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400">
              <i className="fa-solid fa-times"></i>
            </button>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto">
            {searchResults.map((r, i) => (
              <button key={i} onClick={() => handleSelectSearchResult(r)} className="w-full text-left p-3 border-b border-gray-50 hover:bg-gray-50 flex items-center gap-3">
                <i className="fa-solid fa-location-dot text-slate-400"></i>
                <div>
                  <p className="text-sm font-bold text-slate-800 truncate">{r.display_name.split(',')[0]}</p>
                  <p className="text-xs text-slate-400 truncate">{r.display_name}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer center={currentCoords} zoom={18} maxZoom={20} scrollWheelZoom={true} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <LocationMarker position={currentCoords} setPosition={setCurrentCoords} onLocationFound={handleDragEnd} />
        </MapContainer>

        {/* "Use Current Location" Floating Pill */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000]">
          <button
            onClick={handleUseCurrentLocation}
            className="bg-white px-4 py-2 rounded-full shadow-lg border border-green-100 flex items-center gap-2 text-green-700 font-bold text-xs uppercase tracking-wider hover:scale-105 transition-transform"
          >
            {isLoadingLocation ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <i className="fa-solid fa-crosshairs"></i>
            )}
            Use Current Location
          </button>
        </div>
      </div>

      {/* Bottom Sheet - Address Details */}
      <div className="bg-white rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 z-[1002] animate-slideUp">
        <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>

        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Delivering your order to</h3>

        <div className="flex items-start gap-4 mb-8">
          <div className="mt-1">
            <i className="fa-solid fa-location-dot text-2xl text-red-500"></i>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-black text-slate-900 leading-none">
                {address.split(',')[0]}
              </h2>
              <button className="text-xs font-bold text-green-600 hover:text-green-700 uppercase">Change</button>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              {address}
            </p>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className={`w-full py-4 rounded-xl font-black text-base uppercase tracking-widest shadow-lg shadow-green-200 transition-all active:scale-95 ${isConfirming ? 'bg-green-800 text-white/50' : 'bg-green-600 text-white hover:bg-green-700'
            }`}
        >
          {isConfirming ? 'Confirming...' : 'Confirm Location'}
        </button>
      </div>

    </div>
  );
};

export default LocationPicker;