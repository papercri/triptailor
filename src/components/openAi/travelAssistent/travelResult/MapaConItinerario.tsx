'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getCoordinates } from '@/services/geocode'; 
import { MapBounds } from '@/components/map/MapBounds';

import L, { Map as LeafletMap, LatLngTuple } from 'leaflet';
import { MapPin } from 'lucide-react';
import { Itinerary } from '@/types/itineraryItem'
const defaultPosition: LatLngTuple = [48.8566, 2.3522]; // París por defecto

type Place = Itinerary & {
  place: string;
  lat?: number;
  lng?: number;
  description?: string;
  title?: string;
  day?: number | undefined;
};

export default function MapaConItinerario({ itinerary }: { itinerary: Place[] }) {
  const [itineraryWithCoords, setItineraryWithCoords] = useState<Place[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);

  const customIcon = (day: number) =>
    L.divIcon({
      className: 'text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow',
      html: `<div>${day}</div>`,
    });

  useEffect(() => {
    const fetchCoords = async () => {
      const enriched = await Promise.all(
        itinerary.map(async (item) => {
          const coords = await getCoordinates(item.place);
          return coords
            ? { ...item, lat: coords.lat, lng: coords.lng }
            : item;
        })
      );
      const validCoords = enriched.filter((item) => item.lat && item.lng);
      setItineraryWithCoords(validCoords);

      // 👉 Forzar redibujado del mapa cuando ya hay coordenadas
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 100); // pequeño delay para asegurarse de que el modal está visible
    };

    fetchCoords();
  }, [itinerary]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="h-[500px] w-[300px]">
        <MapContainer
          center={defaultPosition}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg shadow-lg"
          whenReady={() => {
            if (mapRef.current === null) {

              const leafletContainer = document.querySelector('.leaflet-container') as HTMLElement | null;
              mapRef.current = (leafletContainer && (leafletContainer as HTMLElement & { _leaflet_map?: LeafletMap })._leaflet_map)
                ? (leafletContainer as HTMLElement & { _leaflet_map?: LeafletMap })._leaflet_map || null
                : null;
            }
          }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          />
          {itineraryWithCoords.map((item, idx) => (
            <Marker
              key={idx}
              position={[item.lat!, item.lng!]}
              icon={customIcon(item.day)}
            >
              <Popup>
                <strong>Day {item.day}:</strong> {item.title}<br />
                {item.description}
              </Popup>
            </Marker>
          ))}
          <MapBounds coordinates={itineraryWithCoords.map(p => [p.lat!, p.lng!])} />
        </MapContainer>
      </div>

      <div className="space-y-4">
        {itineraryWithCoords.map((item, idx) => (
          <div key={idx} className="text-grey-800 border-0">
            {idx === 0 || item.day !== itineraryWithCoords[idx - 1].day ? (
              <p className="text-xl font-semibold mb-2">Day {item.day}</p>
            ) : null}
            <p><strong className="text-blue-500 mb-4 text-sm">{item.title}</strong></p>
            <p className="text-gray-800 mb-2 text-sm">{item.description}</p>
            <p className="text-sm text-gray-500 whitespace-nowrap">
              <MapPin className="inline" size={12} /> {item.place}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
