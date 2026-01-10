import { mappls, mappls_plugin } from 'mappls-web-maps';

let mapplsClassObject: mappls | null = null;
let mapplsPluginObject: mappls_plugin | null = null;
let isInitialized = false;

/**
 * Initialize Mappls SDK with API key
 */
export const initializeMappls = (callback: () => void): void => {
    if (isInitialized) {
        callback();
        return;
    }

    const restKey = import.meta.env.VITE_MAPPLS_REST_KEY;

    if (!restKey) {
        console.error('Mappls REST Key not found. Please add VITE_MAPPLS_REST_KEY to your .env file');
        return;
    }

    mapplsClassObject = new mappls();
    mapplsPluginObject = new mappls_plugin();

    mapplsClassObject.initialize(restKey, () => {
        isInitialized = true;
        callback();
    });
};

/**
 * Get Mappls class object
 */
export const getMappls = (): mappls | null => {
    return mapplsClassObject;
};

/**
 * Get Mappls plugin object
 */
export const getMapplsPlugin = (): mappls_plugin | null => {
    return mapplsPluginObject;
};

/**
 * Get current location using browser geolocation
 */
export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                let errorMessage = 'Unable to retrieve your location';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out. Please try again.';
                        break;
                }

                reject(new Error(errorMessage));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

/**
 * Reverse geocode coordinates to get address
 * This uses Mappls Reverse Geocoding REST API
 * Reference: https://github.com/MapmyIndia/mapmyindia-rest-api
 */
export const reverseGeocode = async (
    lat: number,
    lng: number
): Promise<string> => {
    try {
        const restKey = import.meta.env.VITE_MAPPLS_REST_KEY;

        // Using Mappls Reverse Geocoding REST API
        // Endpoint format: https://apis.mappls.com/advancedmaps/v1/{REST_KEY}/rev_geocode
        const response = await fetch(
            `https://apis.mappls.com/advancedmaps/v1/${restKey}/rev_geocode?lat=${lat}&lng=${lng}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            console.error('Reverse geocode API returned:', response.status);
            throw new Error('Failed to fetch address');
        }

        const data = await response.json();
        console.log('Reverse geocode response:', data); // Debug log

        // Extract formatted address from response
        // Mappls returns results in 'results' array
        if (data.results && data.results.length > 0) {
            const result = data.results[0];
            const parts = [];

            // Build address from available fields
            if (result.house_number) parts.push(result.house_number);
            if (result.house_name) parts.push(result.house_name);
            if (result.street) parts.push(result.street);
            if (result.subSubLocality) parts.push(result.subSubLocality);
            if (result.subLocality) parts.push(result.subLocality);
            if (result.locality) parts.push(result.locality);
            if (result.village) parts.push(result.village);
            if (result.district) parts.push(result.district);
            if (result.subDistrict) parts.push(result.subDistrict);
            if (result.city) parts.push(result.city);
            if (result.state) parts.push(result.state);
            if (result.pincode) parts.push(result.pincode);

            const formattedAddress = parts.join(', ');
            return formattedAddress || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }

        // Try formatted_address if available
        if (data.results && data.results[0]?.formatted_address) {
            return data.results[0].formatted_address;
        }

        // Fallback formatted address
        return `Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E`;
    }
};

/**
 * Format address for display (split into main and secondary parts)
 */
export const formatAddress = (fullAddress: string): { main: string; secondary: string } => {
    const parts = fullAddress.split(', ');

    if (parts.length <= 2) {
        return {
            main: fullAddress,
            secondary: '',
        };
    }

    return {
        main: parts.slice(0, 2).join(', '),
        secondary: parts.slice(2).join(', '),
    };
};
