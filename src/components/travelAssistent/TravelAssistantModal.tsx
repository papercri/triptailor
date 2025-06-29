'use client';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import TravelAssistantSteps from './TravelAssistent';
import Link from 'next/link';
import Modal from '@/components/ui/Modal/Modal';
import Button from '@/components/ui/Button/Button';
import { MessageCircle } from 'lucide-react';

export default function TravelAssistantModal({ destination }: { destination: string }) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleOpen = () => {
    if (user) {
      setIsOpen(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
  
        <button onClick={handleOpen} className='chatbot-button'>
          <MessageCircle className="chatbot-icon" /> Plan your trip
        </button>

      {/* Modal if user is logged in */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)} variant="large">
          <TravelAssistantSteps destination={destination} />
        </Modal>
      )}

      {/* Modal if not logged in */}
      {showLoginModal && (
        <Modal onClose={() => setShowLoginModal(false)} variant="small">
          <div className="space-y-4 text-center p-6">
            <h2 className="text-xl font-bold">Login Required</h2>
            <p>You need to be logged in to plan your trip.</p>
            <Link href={`/auth/signin?callbackUrl=/destination/${encodeURIComponent(destination)}`} className="inline-block">
              <Button variant="primary">Go to Login</Button>
            </Link>
          </div>
        </Modal>
      )}
    </>
  );
}
