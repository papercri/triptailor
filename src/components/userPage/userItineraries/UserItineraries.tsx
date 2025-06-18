"use client"

import React, { useState, useRef } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from '@/services/firebaseConfig'
import { useUserItineraries } from '@/hooks/useUserItineraries'
import Modal from '@/components/ui/Modal/Modal'
import MapaConItinerarioNoSSR from '@/components/openAi/travelAssistent/travelResult/MapaConItinerario'
import Button from '@/components/ui/Button/Button'
import { Itinerary } from '@/types/itineraryItem'
import TravelAssistantSteps from '@/components/openAi/travelAssistent/TravelAssistent'
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

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
  const [modifyMode, setModifyMode] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    
    if (!printRef.current || !selectedItinerary) return;

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
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${selectedItinerary.destination}_itinerary.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF");
    }
  };

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

  const handleModify = () => {
    setModifyMode(true)
  }

  if (loading) return <p>Loading itineraries...</p>
  if (error) return <p>Error loading itineraries: {error.message}</p>
  if (itineraries.length === 0) return <p>No itineraries saved yet.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Saved Itineraries</h1>
      <div className="grid gap-6">
        {itineraries.map((itinerary) => {
          let promptObj: PromptObj = {}
          try {
            promptObj = typeof itinerary.prompt === 'string'
              ? JSON.parse(itinerary.prompt)
              : itinerary.prompt || {}
          } catch {
            promptObj = {}
          }
        
          return (
            <div key={itinerary.id} className="bg-white rounded-2xl shadow-md p-4">
              <div id={`print-${itinerary.id}`}>
                <h2 className="text-xl font-semibold text-blue-700 mb-1">
                  {itinerary.destination}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {new Date(itinerary.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Trip Type:</strong> {promptObj.travelerType ?? '—'}</p>
                  <p><strong>Days:</strong> {promptObj.days ?? '—'}</p>
                  <p><strong>Budget:</strong> {promptObj.budget ?? '—'}</p>
                  <p><strong>Season:</strong> {promptObj.season ?? '—'}</p>
                  <p><strong>Interests:</strong> {Array.isArray(promptObj.interests) ? promptObj.interests.join(', ') : '—'}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <Button variant="primary" onClick={() => { setSelectedItinerary(itinerary as unknown as Itinerary); setModifyMode(false) }}>
                  View Details
                </Button>
    
                <Button variant="secondary" onClick={() => { setSelectedItinerary(itinerary as unknown as Itinerary); handleModify() }}>
                  Modify
                </Button>
                <Button
                variant="danger"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this itinerary?")) {
                    handleDelete(itinerary.id);
                  }
                }}
              >
                Delete
              </Button>
              </div>
            </div>
          )
        })}
      </div>

      {selectedItinerary && (
        <Modal onClose={() => setSelectedItinerary(null)}>
          {modifyMode ? (
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Modify Itinerary for {selectedItinerary.destination}
              </h4>
              <TravelAssistantSteps
                destination={selectedItinerary.destination}
              />
            </div>
          ) : (
            <div ref={printRef} className="h-[400px] w-full">
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {selectedItinerary.destination}
              </h4>
              <MapaConItinerarioNoSSR itinerary={selectedItinerary.itinerary} />
              <Button variant="secondary"  onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
