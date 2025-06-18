'use client';

import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import MapaConItinerarioNoSSR from '@/components/openAi/travelAssistent/travelResult/MapaConItinerario';
import { Itinerary } from '@/types/itineraryItem';
import { Clock, Luggage, PiggyBank, SunSnow, Smile } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleDownloadPDF = async () => {
    if (!printRef.current || !itinerary) return;
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
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${itinerary.destination}_itinerary.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

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
        <Button variant="secondary" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <ToastContainer position="top-center" autoClose={2000} />
      </div>
    </Modal>
  );
}
