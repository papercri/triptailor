
export async function getCoordinates(place: string) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(place)}`
  );
  const data = await res.json();

  if (!data || data.length === 0) return null;

  const location = data[0];
  const { city, town, village, country } = location.address;

  const locationName = `${city || town || village || place}, ${country}`;

  return {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon),
    displayName: locationName,
  };
}