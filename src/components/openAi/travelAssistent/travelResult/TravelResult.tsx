'use client';

import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { enrichItineraryWithCoords } from '@/utils/enrichItinerary';
import { ItineraryItem } from '@/types/itineraryItem';
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/ui/Button/Button';
import {  Download} from 'lucide-react';
import Spinner from '@/components/ui/Spinner/Spinner';
const MapaConItinerario = dynamic(
  () => import('@/components/openAi/travelAssistent/travelResult/MapaConItinerario'),
  {
    ssr: false,
    loading: () => <p><Spinner /></p>,
  }
);

type TravelResultProps = {
  itinerary: ItineraryItem[];
  destination: string;
  userId: string;
  userEmail?: string | null;
  form: {
    travelerType: string;
    budget: string;
    days: number;
    season: string;
    interests: string[];
  };
};

export default function TravelResult({ itinerary, destination, userId, userEmail, form }: TravelResultProps) {

  const saveItinerary = async () => {
    try {
      const enriched = await enrichItineraryWithCoords(itinerary);
      const userRef = doc(db, 'users', userId);
      const itinerariesRef = collection(userRef, 'itineraries');
    
       await addDoc(itinerariesRef, {
        destination,
        userId,
        email: userEmail ?? null,
        itinerary: enriched,
        createdAt: new Date().toISOString(),
        prompt: {
          travelerType: form.travelerType || '',
          budget: form.budget || '',
          days: form.days || 0,
          season: form.season || '',
          interests: Array.isArray(form.interests) ? form.interests : [],
        },
      });

      toast.success('Itinerary saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error saving itinerary');
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-gray-800 mb-2">Your Itinerary</h3>
        <p className="text-gray-600">Discover the beauty of {destination}</p>
      </div>
      
      <MapaConItinerario itinerary={itinerary} />
 
      <div className='block text-right mt-4'>
        <Button onClick={saveItinerary} variant="secondary" size = "sm" icon={<Download className='inline'/>}>
            Save Itinerary
        </Button>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}