'use client';

import { ref, set } from 'firebase/database';
import { database } from '@/services/firebaseConfig';
import { enrichItineraryWithCoords } from '@/utils/enrichItinerary';
import { ItineraryItem } from '@/types/itineraryItem';
import dynamic from 'next/dynamic';

const MapaConItinerarioNoSSR = dynamic(() => import('./MapaConItinerario'), {
  ssr: false,
});

type TravelResultProps = {
  itinerary: ItineraryItem[];
  destination: string;
  userId: string;
  userEmail?: string | null;
};

export default function TravelResult({ itinerary, destination, userId, userEmail }: TravelResultProps) {
  const saveItinerary = async () => {
    try {
      const enriched = await enrichItineraryWithCoords(itinerary);
      const itineraryId = Date.now();

      await set(ref(database, `itineraries/${userId}/${itineraryId}`), {
        userId,
        email: userEmail ?? null,
        destination,
        itinerary: enriched,
        createdAt: new Date().toISOString(),
      });

      alert('Itinerary saved successfully!');
    } catch (error) {
      console.error(error);
      alert('Error saving itinerary');
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-2">Your Itinerary</h3>
      <MapaConItinerarioNoSSR itinerary={itinerary} />
      <button
        onClick={saveItinerary}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Itinerary
      </button>
    </div>
  );
}
