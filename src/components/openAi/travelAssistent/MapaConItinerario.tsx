'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { getCoordinates } from '@/utils/geocode'; 
import { MapBounds }  from '@/components/map/MapBounds';

import L from 'leaflet';

import type { LatLngTuple } from 'leaflet';

const defaultPosition: LatLngTuple = [48.8566, 2.3522]; // París por defecto

interface Place {
  day: number;
  title: string;
  place: string;
  description: string;
  lat?: number;
  lng?: number;
}

export default function MapaConItinerario({ itinerary }: { itinerary: Place[] }) {
  const [itineraryWithCoords, setItineraryWithCoords] = useState<Place[]>([]);
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
    setItineraryWithCoords(enriched.filter((item) => item.lat && item.lng));
  };

  fetchCoords();
}, [itinerary]);


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="h-[500px] w-full rounded-lg shadow-lg">
        <MapContainer
            center={defaultPosition}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
            />
          {itineraryWithCoords.map((item, idx) => (
                <Marker key={idx} position={[item.lat!, item.lng!]} icon={customIcon(item.day)}>
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
        <div key={idx} className="p-2 mb-2  rounded-lg shadow">
            {idx === 0 || item.day !== itineraryWithCoords[idx - 1].day ? (
            <p className="font-bold">Day {item.day}</p>
            ) : null}
            <p><strong>{item.title}</strong></p>
            <p>{item.description}</p>
            <p className="text-sm text-gray-500">{item.place}</p>
        </div>
        ))}
      </div>
    </div>
  );
}
