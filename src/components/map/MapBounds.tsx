import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { LatLngBounds } from 'leaflet';

export function MapBounds({ coordinates }: { coordinates: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates.length === 0) return;
    const bounds = new LatLngBounds(coordinates);
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [coordinates, map]);

  return null;
}
