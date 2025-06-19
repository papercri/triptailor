'use client';
import { useState } from 'react';
import { addDoc, collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { enrichItineraryWithCoords } from '@/utils/enrichItinerary';
import { ItineraryItem } from '@/types/itineraryItem';
import dynamic from 'next/dynamic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/ui/Button/Button';
import { Save } from 'lucide-react';
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

  const [isSaving, setIsSaving] = useState(false);
  const saveItinerary = async () => {
    setIsSaving(true);
    try {
      const enriched = await enrichItineraryWithCoords(itinerary);
      const userRef = doc(db, 'users', userId);
      const itinerariesRef = collection(userRef, 'itineraries');

      // 🔍 Buscar si ya existe con ese destino
      const q = query(itinerariesRef, where('destination', '==', destination));
      const existingSnapshot = await getDocs(q);

      if (!existingSnapshot.empty) {
        const confirmOverwrite = confirm(`You already have an itinerary for ${destination}. Do you want to overwrite it? Click "Cancel" to save a new one.`);

        if (confirmOverwrite) {
          // ✏️ Sobrescribimos el primero que encontremos
          const docToUpdate = existingSnapshot.docs[0];
          await updateDoc(docToUpdate.ref, {
            itinerary: enriched,
            updatedAt: new Date().toISOString(),
            prompt: {
              travelerType: form.travelerType || '',
              budget: form.budget || '',
              days: form.days || 0,
              season: form.season || '',
              interests: Array.isArray(form.interests) ? form.interests : [],
            },
          });
          toast.success('Itinerary overwritten successfully!');
          return;
        }
      }

      // 🆕 Crear uno nuevo
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
      finally {
        setIsSaving(false);
    }
  };

  return (
   <div className="mt-4 bg-white p-4 rounded shadow">
        <h3 className="text-4xl text-center font-bold text-gray-800 mb-2">Your Itinerary to {destination}</h3>
        <div className='block text-right mr-[20px]'>
            <Button onClick={saveItinerary} 
            variant="secondary" 
            size="sm" 
            icon={<Save className="inline" />}
            disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Itinerary'}
          </Button>
        </div>
      <MapaConItinerario itinerary={itinerary} />

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
