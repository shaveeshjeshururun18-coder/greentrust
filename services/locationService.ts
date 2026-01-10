
export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
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
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'GreenTrustGrocery/1.0',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding failed');
        }

        const data = await response.json();

        // Format the address nicely
        const address = data.address;
        const parts = [];

        // Prioritize neighborhood/suburb for the short display
        if (address.neighbourhood) parts.push(address.neighbourhood);
        if (address.road) parts.push(address.road);
        if (address.suburb) parts.push(address.suburb);
        else if (address.residential) parts.push(address.residential);
        else if (address.village) parts.push(address.village);

        if (address.city_district && parts.length < 2) parts.push(address.city_district);
        if (address.city) parts.push(address.city);
        if (address.postcode) parts.push(address.postcode);

        if (parts.length === 0) return data.display_name;
        // Deduplicate parts
        const uniqueParts = [...new Set(parts)];
        return uniqueParts.join(', ');
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
};

export const searchPlace = async (query: string): Promise<any[]> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'GreenTrustGrocery/1.0',
                    'Accept-Language': 'en-US,en;q=0.9',
                },
            }
        );

        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
};
