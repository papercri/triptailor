
'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


type Props = {
  lat: number;
  lng: number;
  place: string;
};

export default function Map({ lat, lng, place }: Props) {
  const position: [number, number] = [lat, lng];

  // Soluciona el problema de los iconos por defecto
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  });

  return (
    <MapContainer center={position} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='© <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{place}</Popup>
      </Marker>
    </MapContainer>
  );
}
