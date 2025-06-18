'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { getCoordinates } from '@/services/geocode'; 
import { MapBounds }  from '@/components/map/MapBounds';
import { ItineraryItem } from '@/types/itineraryItem';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

import type { LatLngTuple } from 'leaflet';


const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });
const LatLngTuple = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const defaultPosition: LatLngTuple = [48.8566, 2.3522]; // París por defecto

type Place = ItineraryItem;

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
      <div className="h-[500px] w-full">
        <MapContainer
            center={defaultPosition}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            className='rounded-lg shadow-lg'
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
        <div key={idx} className=" text-grey-800 border-0">
            {idx === 0 || item.day !== itineraryWithCoords[idx - 1].day ? (
            <p className="text-xl font-semibold mb-2">Day {item.day}</p>
            ) : null}
            <p><strong className='text-blue-500 mb-4 text-sm'>{item.title}</strong></p>
            <p className='text-gray-800 mb-2 text-sm'>{item.description}</p>
            <p className="text-sm text-gray-500 whitespace-nowrap"><MapPin className='inline' size={12} /> {item.place}</p>
        </div>
        ))}
      </div>
    </div>
  );
}