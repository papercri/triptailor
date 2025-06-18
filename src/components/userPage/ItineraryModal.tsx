'use client';

import { useRef } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import MapaConItinerarioNoSSR from '@/components/openAi/travelAssistent/travelResult/MapaConItinerario';
import { Itinerary } from '@/types/itineraryItem';
import { Clock, Luggage, PiggyBank, SunSnow, Smile } from 'lucide-react';

type PromptObj = {
  travelerType?: string;
  days?: number;
  budget?: string;
  season?: string;
  interests?: string[];
};

interface ItineraryModalProps {
  itinerary: Itinerary;
  onClose: () => void;
}

export default function ItineraryModal({ itinerary, onClose }: ItineraryModalProps) {
  const printRef = useRef<HTMLDivElement>(null);
  const selectedPromptObj: PromptObj = (() => {
    try {
      return typeof itinerary.prompt === 'string'
        ? JSON.parse(itinerary.prompt)
        : itinerary.prompt || {};
    } catch {
      return {};
    }
  })();

  return (
    <Modal onClose={onClose} variant="large">
      <div ref={printRef} className="h-[400px] w-full">
        <h3 className="text-2xl font-bold text-center mb-4">
          Your Itinerary to: {itinerary.destination}
        </h3>
        
        <div className="flex gap-6 mb-4 justify-center text-cyan-800 text-sm">
          <div className="modal-pill">
            <Clock className="icon" /> {selectedPromptObj.days ?? '—'}
          </div>
          <div className="modal-pill">
            <Luggage className="icon" /> {selectedPromptObj.travelerType ?? '—'}
          </div>
          <div className="modal-pill">
            <PiggyBank className="icon" /> {selectedPromptObj.budget ?? '—'}
          </div>
          <div className="modal-pill">
            <SunSnow className="icon" /> {selectedPromptObj.season ?? '—'}
          </div>
          <div className="modal-pill">
            <Smile className="icon" /> {selectedPromptObj.interests ?? '—'}
          </div>
        </div>
        <MapaConItinerarioNoSSR itinerary={itinerary.itinerary} />
      

      </div>
    </Modal>
  );
}
