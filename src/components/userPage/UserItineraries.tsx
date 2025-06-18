"use client"

import React, { useState, useRef } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/services/firebaseConfig'
import { useUserItineraries } from '@/hooks/useUserItineraries'
import ItineraryModal from '@/components/userPage/ItineraryModal'
import { Itinerary } from '@/types/itineraryItem'
import Spinner from '@/components/ui/Spinner/Spinner';
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";
import '@/styles/userItineraries.scss'
import ItineraryCard from '@/components/userPage/ItineraryCard';

type PromptObj = {
  travelerType?: string
  days?: number
  budget?: string
  season?: string
  interests?: string[]
}

export default function UserItinerariesPage() {
  const { itineraries, loading, error } = useUserItineraries()
  const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null)

  async function handleDelete(itineraryId: string) {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      alert("User not authenticated");
      return;
    }

    try {
      await deleteDoc(doc(db, "users", userId, "itineraries", itineraryId));
      alert("Itinerary deleted successfully");

    } catch (error) {
      console.error("Failed to delete itinerary", error);
      alert("Failed to delete itinerary");
    }
  }

  if (loading) return <div className='grid items-center justify-center h-screen'><Spinner /></div>
  if (error) return <p>Error loading itineraries: {error.message}</p>
  if (itineraries.length === 0) return <p>No itineraries saved yet.</p>

  return (
    <div className="user-itineraries">
      <h1>Your Saved Itineraries</h1>
      <div className="itineraries-grid">
       {itineraries.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          onView={(i) => setSelectedItinerary(i)}
          onModify={(i) => {
            setSelectedItinerary(i);
            handleModify();
          }}
          onDelete={handleDelete}
        />
      ))}
      </div>

      {selectedItinerary && (
        
         <ItineraryModal
          itinerary={selectedItinerary}
          onClose={() => setSelectedItinerary(null)}
        />
      )}
    </div>
  )
}