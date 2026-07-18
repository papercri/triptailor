// Nominatim OpenStreetMap geocoding utility
// This function fetches coordinates and address details for a given place name

import placeCoordinates from '@/data/placeCoordinates.json';

const fallbackCoordinates = placeCoordinates as Record<string, { lat: number; lng: number; displayName: string }>;

export async function getCoordinates(place: string) {
  if (!place?.trim()) return null;

  const query = place.trim().toLowerCase();

  const directMatch = fallbackCoordinates[query];
  if (directMatch) {
    return directMatch;
  }

  try {
    if (typeof window !== 'undefined') {
      const res = await fetch(`/api/geocode?place=${encodeURIComponent(place)}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error(`Error HTTP ${res.status} from geocoding API`);
        return directMatch ?? null;
      }

      const data = await res.json();
      if (!data || typeof data.lat !== 'number' || typeof data.lng !== 'number') {
        return directMatch ?? null;
      }

      return data;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(place)}`,
      {
        headers: {
          'User-Agent': 'TripTailor/1.0 (papercri@gmail.com)',
          Accept: 'application/json',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      console.error(`Error HTTP ${res.status} from Nominatim`);
      return directMatch ?? null;
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Nominatim did not return JSON. Response was likely HTML');
      return directMatch ?? null;
    }

    const data = await res.json();
    if (!data || data.length === 0) return directMatch ?? null;

    const location = data[0];
    const address = location.address || {};

    const locationNameParts = [
      address.city,
      address.town,
      address.village,
      address.country,
      address.state,
      place,
    ].filter(Boolean);

    const country = address.country || '';
    const locationName = locationNameParts.length
      ? locationNameParts.join(', ') + (country ? `, ${country}` : '')
      : place;

    return {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
      displayName: locationName,
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return directMatch ?? null;
  }
}

