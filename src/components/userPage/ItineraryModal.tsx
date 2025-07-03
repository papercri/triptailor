'use client';

import { useRef } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import { Itinerary } from '@/types/itineraryItem';
import { Clock, Luggage, PiggyBank, SunSnow, Smile } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapaConItinerario = dynamic(() =>
  import('../travelAssistent/travelResult/MapaConItinerario'), {
    ssr: false
  });
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
        <h3 className="sm:text-2xl text-xl  text-center mb-4 mt-6 text-[#1483B4]">
          Your Itinerary to: <strong className='block'>{itinerary.destination}</strong>
        </h3>
        <div className="flex justify-center mt-2">
           <div className="flex sm:gap-6 gap-2 mb-4 justify-center text-[#1483B4] text-xs font-bold max-w-full bg-gray-100 p-3 rounded-3xl w-fit">
            <div className="modal-pill">
              <Clock className="icon" /> 
              <span>{selectedPromptObj.days ?? '—'}</span>
            </div>
            <div className="modal-pill">
              <Luggage className="icon" /> 
              <span>{selectedPromptObj.travelerType ?? '—'}</span>
            </div>
            <div className="modal-pill">
              <PiggyBank className="icon" /> <span>{selectedPromptObj.budget ?? '—'}</span>
            </div>
            <div className="modal-pill">
              <SunSnow className="icon" /> <span>{selectedPromptObj.season ?? '—'}</span>
            </div>
            <div className="modal-pill">
              <Smile className="icon" /> <span>{selectedPromptObj.interests?.join(', ') ?? '—'}</span>
            </div>
          </div>
        </div>
         
        <MapaConItinerario itinerary={itinerary.itinerary} />
      </div>
    </Modal>
  );
}
