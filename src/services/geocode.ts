// Nominatim OpenStreetMap geocoding utility
// This function fetches coordinates and address details for a given place name

export async function getCoordinates(place: string) {
  if (!place?.trim()) return null;

  const query = place.trim();

  try {
    if (typeof window !== 'undefined') {
      const res = await fetch(`/api/geocode?place=${encodeURIComponent(query)}`, {
        headers: { Accept: 'application/json' },
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error(`Error HTTP ${res.status} from geocoding API`);
        return null;
      }

      const data = await res.json();
      if (!data || typeof data.lat !== 'number' || typeof data.lng !== 'number') {
        return null;
      }

      return data;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(query)}`,
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
      return null;
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Nominatim did not return JSON. Response was likely HTML');
      return null;
    }

    const data = await res.json();
    if (!data || data.length === 0) return null;

    const location = data[0];
    const address = location.address || {};

    const locationNameParts = [
      address.city,
      address.town,
      address.village,
      address.country,
      address.state,
      query,
    ].filter(Boolean);

    const country = address.country || '';
    const locationName = locationNameParts.length
      ? locationNameParts.join(', ') + (country ? `, ${country}` : '')
      : query;

    return {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
      displayName: locationName,
      address,
    };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

