import React, { useState, useEffect, useRef } from 'react';
import { initializeMappls, getMappls, getMapplsPlugin, getCurrentLocation, reverseGeocode, formatAddress } from '../services/mapplsService';
import type { MapplsMap, MapplsMarker } from 'mappls-web-maps';

interface LocationPickerProps {
  onConfirm: (address: string) => void;
  onBack: () => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onConfirm, onBack }) => {
  const [address, setAddress] = useState('Loading map...');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [currentCoords, setCurrentCoords] = useState({ lat: 13.0827, lng: 80.2707 }); // Chennai default

  const mapRef = useRef<MapplsMap | null>(null);
  const markerRef = useRef<MapplsMarker | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Mappls map
  useEffect(() => {
    let isMounted = true;

    initializeMappls(() => {
      if (!isMounted || !mapContainerRef.current) return;

      const mapplsObj = getMappls();
      const mapplsPlugin = getMapplsPlugin();

      if (!mapplsObj || !mapplsPlugin) {
        setAddress('Failed to load map. Please check your API key.');
        return;
      }

      try {
        // Create map centered on Chennai
        const map = mapplsObj.Map({
          id: 'mappls-map',
          properties: {
            center: [currentCoords.lat, currentCoords.lng],
            zoom: 15,
            zoomControl: true,
            location: false,
          },
        });

        mapRef.current = map;

        // Create draggable marker at center
        const marker = mapplsPlugin.marker({
          map: map,
          position: [currentCoords.lat, currentCoords.lng],
          draggable: true,
        });

        markerRef.current = marker;

        // Get initial address
        reverseGeocode(currentCoords.lat, currentCoords.lng).then((addr) => {
          if (isMounted) setAddress(addr);
        });

        // Update address when map is moved (marker stays centered)
        map.on('moveend', () => {
          const center = map.getCenter();
          if (marker) {
            marker.setPosition([center.lat, center.lng]);
          }

          setCurrentCoords({ lat: center.lat, lng: center.lng });

          // Update address via reverse geocoding
          reverseGeocode(center.lat, center.lng).then((addr) => {
            if (isMounted) setAddress(addr);
          });
        });

        setAddress('Move map to select location');
      } catch (error) {
        console.error('Error initializing map:', error);
        setAddress('Failed to initialize map. Please refresh the page.');
      }
    });

    return () => {
      isMounted = false;
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {
          console.error('Error removing map:', e);
        }
      }
    };
  }, []);

  // Handle search with autocomplete
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const restKey = import.meta.env.VITE_MAPPLS_REST_KEY;

        // Using Mappls Atlas Autosuggest API
        // Reference: https://about.mappls.com/api/advanced-maps/doc/autosuggest-atlas-api
        const response = await fetch(
          `https://atlas.mappls.com/api/places/search/json?query=${encodeURIComponent(searchQuery)}&access_token=${restKey}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log('Search results:', data); // Debug log
          setSearchResults(data.suggestedLocations || []);
        } else {
          console.error('Search API returned:', response.status);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500); // Debounce search

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Handle "Use Current Location" button
  const handleUseCurrentLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const coords = await getCurrentLocation();
      setCurrentCoords(coords);

      // Update map center
      if (mapRef.current) {
        mapRef.current.setCenter([coords.lat, coords.lng]);
        mapRef.current.setZoom(17);
      }

      // Update marker
      if (markerRef.current) {
        markerRef.current.setPosition([coords.lat, coords.lng]);
      }

      // Get address
      const addr = await reverseGeocode(coords.lat, coords.lng);
      setAddress(addr);
      setSearchQuery(''); // Clear search when using current location
      setSearchResults([]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to get your location';
      setLocationError(errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Handle search result selection
  const handleSelectSearchResult = (result: any) => {
    const lat = parseFloat(result.latitude || result.lat);
    const lng = parseFloat(result.longitude || result.lng);

    if (!isNaN(lat) && !isNaN(lng)) {
      setCurrentCoords({ lat, lng });

      // Update map center
      if (mapRef.current) {
        mapRef.current.setCenter([lat, lng]);
        mapRef.current.setZoom(17);
      }

      // Update marker
      if (markerRef.current) {
        markerRef.current.setPosition([lat, lng]);
      }

      // Set address from search result
      const addressText = result.placeName || result.placeAddress || result.formattedAddress;
      if (addressText) {
        setAddress(addressText);
      } else {
        // Fallback to reverse geocode
        reverseGeocode(lat, lng).then(setAddress);
      }

      // Clear search
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => onConfirm(address), 800);
  };

  const { main, secondary } = formatAddress(address);

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col animate-fadeIn">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex flex-col gap-4 bg-gradient-to-b from-white/95 via-white/70 to-transparent">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center active-pop border border-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleUseCurrentLocation}
            disabled={isLoadingLocation}
            className="flex-1 bg-white rounded-[1.5rem] p-4 shadow-2xl flex items-center gap-3 border border-gray-100 active-pop"
          >
            {isLoadingLocation ? (
              <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            )}
            <span className="flex-1 text-sm font-bold text-gray-800 text-left">
              {isLoadingLocation ? 'Detecting location...' : 'Use Current Location'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for area, street, or landmark..."
            className="w-full bg-white rounded-[1.5rem] p-4 pl-12 shadow-2xl text-sm font-bold text-gray-800 placeholder:text-gray-300 border border-gray-100 outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-30">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectSearchResult(result)}
                  className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-50 last:border-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm truncate">
                      {result.placeName || result.placeAddress}
                    </p>
                    {result.placeAddress && result.placeName !== result.placeAddress && (
                      <p className="text-xs text-gray-400 truncate mt-1">
                        {result.placeAddress}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Loading State for Search */}
          {isSearching && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-green-600/30 border-t-green-600 rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600 font-medium">Searching...</span>
            </div>
          )}
        </div>
      </div>

      {/* Mappls Map Container */}
      <div className="flex-1 relative mt-40">
        <div
          id="mappls-map"
          ref={mapContainerRef}
          className="w-full h-full"
        ></div>

        {/* Center Pin Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative -mt-16">
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

        {/* Map Instructions Hint */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg pointer-events-none backdrop-blur-sm">
          Drag map or search to select location
        </div>
      </div>

      {/* Error Message */}
      {locationError && (
        <div className="absolute top-52 left-6 right-6 bg-red-50 border border-red-200 rounded-2xl p-4 shadow-lg z-10 animate-slideDownFade">
          <div className="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-900">{locationError}</p>
              <p className="text-xs text-red-700 mt-1">You can search or drag the map to select your location.</p>
            </div>
            <button
              onClick={() => setLocationError(null)}
              className="text-red-400 hover:text-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Address Card */}
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
              <p className="text-gray-900 font-bold leading-tight">{main || address}</p>
              {secondary && (
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{secondary}</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isConfirming || address === 'Loading map...' || address.startsWith('Failed')}
          className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-[0_20px_40px_rgba(34,197,94,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 ${isConfirming ? 'bg-green-700' : 'bg-green-600'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
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