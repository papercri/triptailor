'use client';
import { useState } from 'react';
import { addDoc, collection, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { enrichItineraryWithCoords } from '@/utils/enrichItinerary';
import { ItineraryItem } from '@/types/itineraryItem';
import dynamic from 'next/dynamic';
import {  toast } from 'react-toastify';
import Button from '@/components/ui/Button/Button';
import { Save } from 'lucide-react';
import Spinner from '@/components/ui/Spinner/Spinner';
import Modal from '@/components/ui/Modal/Modal';

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [overwriteDocId, setOverwriteDocId] = useState<string | null>(null);

  const promptData = {
    travelerType: form.travelerType || '',
    budget: form.budget || '',
    days: form.days || 0,
    season: form.season || '',
    interests: Array.isArray(form.interests) ? form.interests : [],
  };

  const saveNewItinerary = async () => {
    setIsSaving(true);
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
        prompt: promptData,
      });

      toast.success('Itinerary saved as new!');
    } catch (error) {
      console.error(error);
      toast.error('Error saving itinerary');
    } finally {
      setIsSaving(false);
    }
  };

  const saveItinerary = async () => {
    setIsSaving(true);
    try {
      const enriched = await enrichItineraryWithCoords(itinerary);
      const userRef = doc(db, 'users', userId);
      const itinerariesRef = collection(userRef, 'itineraries');

      const q = query(itinerariesRef, where('destination', '==', destination));
      const existingSnapshot = await getDocs(q);

      if (!existingSnapshot.empty) {
        setOverwriteDocId(existingSnapshot.docs[0].id);
        setShowConfirm(true);
        setIsSaving(false);
        return;
      }

      await addDoc(itinerariesRef, {
        destination,
        userId,
        email: userEmail ?? null,
        itinerary: enriched,
        createdAt: new Date().toISOString(),
        prompt: promptData,
      });

      toast.success('Itinerary saved successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error saving itinerary');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOverwrite = async () => {
    if (!overwriteDocId) return;
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', userId);
      const itinerariesRef = collection(userRef, 'itineraries');
      const docToUpdate = doc(itinerariesRef, overwriteDocId);
      const enriched = await enrichItineraryWithCoords(itinerary);

      await updateDoc(docToUpdate, {
        itinerary: enriched,
        updatedAt: new Date().toISOString(),
        prompt: promptData,
      });

      toast.success('Itinerary overwritten successfully!');
      setShowConfirm(false);
      setOverwriteDocId(null);
    } catch (error) {
      console.error(error);
      toast.error('Error overwriting itinerary');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-4 bg-white p-4 rounded shadow">
      <h3 className="text-4xl text-center font-bold text-gray-800 mb-2">Your Itinerary to {destination}</h3>
      <div className="block text-right mr-[20px]">
        <Button
          onClick={saveItinerary}
          variant="secondary"
          size="sm"
          icon={<Save className="inline" />}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Itinerary'}
        </Button>
      </div>

      <MapaConItinerario itinerary={itinerary} />

      {showConfirm && (
        <Modal onClose={() => setShowConfirm(false)} variant="med">
          <div className="max-w-[600px] p-4 flex justify-center">
            <div>
              <h4 className="text-lg font-bold mb-2">Overwrite Itinerary?</h4>
              <p className="mb-4">
                You already have an itinerary for <b>{destination}</b>.<br />
                Do you want to overwrite it?<br />
                <span className="text-xs text-gray-500">
                  Click &#39;Cancel&#39; to save a new one instead.
                </span>
              </p>
              <div className="flex gap-4 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setShowConfirm(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={saveNewItinerary}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save as New'}
                </Button>
                <Button
                  variant="accent"
                  onClick={handleOverwrite}
                  disabled={isSaving}
                >
                  {isSaving ? 'Overwriting...' : 'Overwrite'}
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}


    </div>
  );
}
