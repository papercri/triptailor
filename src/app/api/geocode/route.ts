import { NextResponse } from 'next/server';
import placeCoordinates from '@/data/placeCoordinates.json';

const fallbackCoordinates = placeCoordinates as Record<string, { lat: number; lng: number; displayName: string }>;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const place = searchParams.get('place');

    if (!place?.trim()) {
      return NextResponse.json({ error: 'Missing place parameter' }, { status: 400 });
    }

    const directMatch = fallbackCoordinates[place.trim().toLowerCase()];
    if (directMatch) {
      return NextResponse.json(directMatch);
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(place)}`,
      {
        headers: {
          'User-Agent': 'TripTailor/1.0 (papercri@gmail.com)',
          Accept: 'application/json',
        },
        next: { revalidate: 86400 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Geocoding failed with status ${response.status}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'No geocoding results found' }, { status: 404 });
    }

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

    return NextResponse.json({
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
      displayName: locationName,
    });
  } catch (error) {
    console.error('Geocoding API error:', error);
    return NextResponse.json(
      { error: 'Failed to resolve place coordinates' },
      { status: 500 }
    );
  }
}
