'use client';

import { useEffect, useState } from "react";
import { getUserItineraries } from "@/utils/getUserItineraries";
import { useUser } from "@/context/UserContext";
import Modal from "@/components/ui/Modal/Modal";
import dynamic from "next/dynamic";

import type { ItineraryItem } from '@/types/itineraryItem';
const MapaConItinerarioNoSSR = dynamic(() => import('@/components/openAi/travelAssistent/travelResult/MapaConItinerario'), {
  ssr: false,
});



interface Itinerary {
  id: string;
  destination: string;
  createdAt: string | number | Date;
  itinerary: ItineraryItem[];
}

export default function UserItineraries() {
  const { user } = useUser();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);

useEffect(() => {
  if (user) {
    setLoading(true);
    getUserItineraries(user.uid)
      .then((data) => {
        setItineraries(data);
      })
      .catch((error) => {
        console.error('Error fetching itineraries:', error);
        setItineraries([]);
      })
      .finally(() => {
        setLoading(false);
      });
  } else {
    setItineraries([]);
    setLoading(false);
  }
}, [user]);


  if (!user) return <p>Please log in to see your itineraries.</p>;
  if (loading) return <p>Loading itineraries...</p>;
  if (itineraries.length === 0) return <p>You haven&#39;t saved any itineraries yet.</p>;

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold">Your Itineraries</h2>

      {itineraries.map((itinerary) => (
        <div
          key={itinerary.id}
          className="border p-4 rounded shadow bg-white cursor-pointer hover:bg-gray-50 transition"
          onClick={() => setSelectedItinerary(itinerary)}
        >
          <h3 className="font-semibold">{itinerary.destination}</h3>
          <p className="text-sm text-gray-500">
            {new Date(itinerary.createdAt).toLocaleDateString()}
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-800">
            {itinerary.itinerary.slice(0, 3).map((item, index) => (
              <li key={index}>
                <strong>Day {item.day}:</strong> {item.title}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {selectedItinerary && (
        <Modal onClose={() => setSelectedItinerary(null)}>
    
            <h4 className="text-xl font-semibold text-gray-800 mb-4">{selectedItinerary.destination}</h4>

            <MapaConItinerarioNoSSR itinerary={selectedItinerary.itinerary} />
       
        </Modal>
      )}
    </div>
  );
}
