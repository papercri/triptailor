import React, { useEffect, useState } from 'react';
import { Clock, PiggyBank, SunSnow, Smile, Eye, CircleX } from 'lucide-react';
import { Itinerary } from '@/types/itineraryItem';
import { getCountryBackgroundPhoto } from '@/services/getCountryBackgroundPhoto';

type PromptObj = {
  travelerType?: string;
  days?: number;
  budget?: string;
  season?: string;
  interests?: string[];
};

type ItineraryCardProps = {
  itinerary: Itinerary;
  onView: (itinerary: Itinerary) => void;
  onDelete: (id: string) => void;
};

const parsePrompt = (prompt: unknown): PromptObj => {
  try {
    if (typeof prompt === 'string') {
      return JSON.parse(prompt);
    }
    return prompt || {};
  } catch {
    return {};
  }
};

export default function ItineraryCard({ itinerary, onView, onDelete }: ItineraryCardProps) {
  const promptObj = parsePrompt(itinerary.prompt);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    getCountryBackgroundPhoto(itinerary.destination).then((url) => {
      if (url) setImageUrl(url);
    });
  }, [itinerary.destination, hasMounted]);

  return (
    <div className="card">
       <div className="image-wrapper" onClick={() => onView(itinerary)}>
        {hasMounted && imageUrl ? (
          <img
            src={imageUrl}
            alt={`View of ${itinerary.destination}`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 animate-pulse" aria-hidden="true" />
        )}
      </div>
      <div id={`print-${itinerary.id}`} className="card-content">
        <h2 className="title">
          {promptObj.travelerType ?? '—'} trip to {itinerary.destination}
        </h2>
        <p className="subtitle">
          {new Date(itinerary.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="travel-details">
            <Clock className='inline' color="grey" size={18} />
            {promptObj.days ?? '—'}
            <span>|</span>
            <PiggyBank className='inline' color="grey" size={18} /> {promptObj.budget ?? '—'}
            <span>|</span>
            <SunSnow className='inline' color="grey" size={18} /> {promptObj.season ?? '—'}
            <span>|</span>
            <Smile className='inline' color="grey" size={18} /> {Array.isArray(promptObj.interests) ? promptObj.interests.join(', ') : '—'}
          </div>
          <div className="flex gap-2 mt-4 justify-end">
            <button  onClick={() => onView(itinerary)}>
              <Eye color="grey"/>
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this itinerary?")) {
                  onDelete(itinerary.id);
                }
              }}
            >
              <CircleX color="red"/>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
