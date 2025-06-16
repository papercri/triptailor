// Nominatim OpenStreetMap geocoding utility
// This function fetches coordinates and address details for a given place name

export async function getCoordinates(place: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(place)}`,{
      next: { revalidate: 86400 } // 1 día
    }
  );
  const data = await res.json();

  if (!data || data.length === 0) return null;

  const location = data[0];
  const address = location.address;

  const locationNameParts = [
    address.city,
    address.town,
    address.village,
    address.county,
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
    address,
  };
}
