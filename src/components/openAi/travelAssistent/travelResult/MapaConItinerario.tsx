'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { getCoordinates } from '@/services/geocode'; 
import { MapBounds }  from '@/components/map/MapBounds';
import { ItineraryItem } from '@/types/itineraryItem';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import Spinner from '@/components/ui/Spinner/Spinner';
import type { LatLngTuple } from 'leaflet';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import {  Download } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

const defaultPosition: LatLngTuple = [48.8566, 2.3522]; // París por defecto
const extractCityAndCountry = (place: string): string => {
  const parts = place.split(',').map(p => p.trim());
  if (parts.length >= 2) {
    const city = parts[parts.length - 2];
    const country = parts[parts.length - 1];
    return `${city}, ${country}`;
  }
  return place; 
};
type Place = ItineraryItem;

export default function MapaConItinerario({ itinerary }: { itinerary: Place[] }) {
  const [itineraryWithCoords, setItineraryWithCoords] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true); 
  const printRef = useRef<HTMLDivElement>(null);

  const customIcon = (day: number) =>
    L.divIcon({
      className: 'text-white bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs shadow',
      html: `<div>${day}</div>`,
    });

  useEffect(() => {
    const fetchCoords = async () => {
      setLoading(true);
      const enriched = await Promise.all(
        itinerary.map(async (item) => {
          const coords = await getCoordinates(item.place);
          return coords
            ? { ...item, lat: coords.lat, lng: coords.lng }
            : item;
        })
      );
      setItineraryWithCoords(enriched.filter((item) => item.lat && item.lng));
      setLoading(false);
    };

    fetchCoords();
  }, [itinerary]);

  if (loading) {
    return <div className='grid items-center justify-center h-screen'><Spinner /></div>;
  }
  const handleDownloadPDF = async () => {
    if (!printRef.current || !itinerary) return;
    const pdfTitle = `Your itinerary to ${extractCityAndCountry(itinerary[0]?.place ?? '')}`;
    try {
      const mapContainer = printRef.current.querySelector('.mapaConItinerario');
      if (mapContainer) {
        mapContainer.classList.add('hide-map');
      }
      const element = printRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      if (mapContainer) {
        mapContainer.classList.remove('hide-map');
      }

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
 
    const fontSize = 18;
    pdf.setFontSize(fontSize);
    const textWidth = pdf.getTextWidth(pdfTitle);
    const x = (pdfWidth - textWidth) / 2; 
    const y = fontSize + 10; 

 
    pdf.text(pdfTitle, x, y);


    const imageY = y + 10; 
    pdf.addImage(imgData, 'PNG', 0, imageY, pdfWidth, pdfHeight);

    pdf.save(`TripTailor_itinerary.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };
  if (loading) {
    return <div className='grid items-center justify-center h-screen'><Spinner /></div>;
  }
  return (
    <div ref={printRef}  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="h-[500px] w-full mapaConItinerario" >
        <MapContainer
          center={defaultPosition}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg shadow-lg"
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
            <button onClick={handleDownloadPDF} className='mt-4 text-right'>
              <Download className='inline'/> Download PDF
            </button>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
