'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIPrompt } from '@/utils/getAiPrompt';
import { enrichItineraryWithCoords } from '@/utils/enrichItinerary';
import { ItineraryItem } from '@/types/itineraryItem';
import {
  FaHiking,
  FaSpa,
  FaLandmark,
  FaUtensils,
  FaChild,
  FaUser,
} from 'react-icons/fa';
import dynamic from 'next/dynamic';

const MapaConItinerarioNoSSR = dynamic(() => import('./MapaConItinerario'), {
  ssr: false,
});

const steps = ['Traveler Type', 'Budget', 'Days', 'Season', 'Interests', 'Your Itinerary'];

export default function TravelAssistantSteps({ destination }: { destination: string }) {
  const [form, setForm] = useState({
    travelerType: '',
    budget: '',
    days: '',
    season: '',
    interests: [] as string[],
  });
  const userId = 'user'; 

  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[] | null>(null);

  const goNext = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const goBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSelect = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const updated = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const generateItinerary = async () => {
    setLoading(true);
    const { travelerType, budget, days, season, interests } = form;
    const interestsString = interests.join(', ');

    const prompt = `You are TripTailor, a helpful travel assistant. Generate a ${days}-day travel itinerary in ${destination} for a ${travelerType} traveler with a ${budget} budget who enjoys ${interestsString}, during the ${season}. The output must:
- Be in English.
- Skip any introduction or farewell.
- Use HTML-friendly formatting (e.g., <strong> instead of **).
- Keep each day's plan short and clear.
- Include real place names (museums, landmarks, restaurants, parks, etc.).
- Format the output as a JSON array, like:
[
  {
    "day": 1,
    "title": "Visit the Eiffel Tower",
    "place": " "Eiffel Tower, Paris, France",
    "description": "Start your day at the Eiffel Tower. Buy tickets online to skip the queue."
  },
  ...
]
- Always include the city and country in the "place" field.
- Output only the JSON array.`; 

    const result = await getAIPrompt(prompt);
    try {
      if (result !== null) {
        const parsed = JSON.parse(result);
        setItinerary(parsed);
      } else {
        throw new Error('AI response is null');
      }
    } catch (e) {
      console.error('Invalid AI response', e);
      setItinerary(null);
    } finally {
      setLoading(false);
    }
  };

  const stepAnimation = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.3 },
  };

  const isStepValid = () => {
    if (stepIndex === 0) return !!form.travelerType;
    if (stepIndex === 1) return !!form.budget;
    if (stepIndex === 2) return !!form.days;
    if (stepIndex === 3) return !!form.season;
    if (stepIndex === 4) return form.interests.length > 0;
    return true;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Plan your Trip to {destination}</h2>

      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="absolute h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="flex justify-between text-sm text-gray-500">
        {steps.map((step, index) => (
          <span key={step} className={index <= stepIndex ? 'text-blue-600 font-medium' : ''}>
            {step}
          </span>
        ))}
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div key={stepIndex} {...stepAnimation} className="space-y-4">
          {stepIndex === 0 && (
            <div>
              <p className="mb-2 font-medium">What kind of traveler are you?</p>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Adventure', icon: <FaHiking /> },
                  { label: 'Relax', icon: <FaSpa /> },
                  { label: 'Culture', icon: <FaLandmark /> },
                  { label: 'Food', icon: <FaUtensils /> },
                  { label: 'With children', icon: <FaChild /> },
                  { label: 'Solo', icon: <FaUser /> },
                ].map(({ label, icon }) => (
                  <StepButton
                    key={label}
                    icon={icon}
                    label={label}
                    selected={form.travelerType === label}
                    onClick={() => handleSelect('travelerType', label)}
                  />
                ))}
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div>
              <p className="mb-2 font-medium">Select your budget per day:</p>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleSelect('budget', level)}
                    className={`p-2 px-4 rounded ${
                      form.budget === level
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div>
              <p className="mb-2 font-medium">How many days will you stay?</p>
              <div className="flex gap-2 flex-wrap">
                {['1', '3', '5', '7', 'More than 7'].map((day) => (
                  <button
                    key={day}
                    onClick={() => handleSelect('days', day)}
                    className={`p-2 px-4 rounded ${
                      form.days === day
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div>
              <p className="mb-2 font-medium">Choose the season of your trip:</p>
              <div className="flex gap-2 flex-wrap">
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <button
                    key={season}
                    onClick={() => handleSelect('season', season)}
                    className={`p-2 px-4 rounded ${
                      form.season === season
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-blue-100'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 4 && (
            <div>
              <p className="mb-2 font-medium">Select your interests:</p>
              <div className="flex flex-wrap gap-3">
                {['Museums', 'Nature', 'Beaches', 'Gastronomy', 'Shopping', 'History'].map(
                  (interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-2 px-3 rounded border ${
                        form.interests.includes(interest)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-800 border-gray-300'
                      }`}
                    >
                      {interest}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-4">
        {stepIndex > 0 ? (
          <button
            onClick={goBack}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            ← Back
          </button>
        ) : <div />}

        {stepIndex < steps.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!isStepValid()}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => {
              generateItinerary().then(() => setStepIndex(5));
            }}
            disabled={!isStepValid() || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Itinerary'}
          </button>
        )}
      </div>

      {/* Final result */}
      {stepIndex === 5 && itinerary && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Your Itinerary</h3>
          <MapaConItinerarioNoSSR itinerary={itinerary} />
          <button onClick={async () => {
            const enriched = await enrichItineraryWithCoords(itinerary);
        try {
          const response = await fetch('http://localhost:3001/itineraries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: userId,
              destination,
              itinerary: enriched,
              createdAt: new Date().toISOString()
            })
          });
          if (response.ok) {
            alert('Itinerary saved successfully!');
          } else {
            alert('Failed to save itinerary');
          }
        } catch (error) {
          console.error(error);
          alert('Error saving itinerary');
        }
      }}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Itinerary
          </button>
        </div>
      )}
    </div>
  );
}

function StepButton({
  icon,
  label,
  onClick,
  selected = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded flex flex-col items-center border transition ${
        selected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-gray-100 hover:bg-blue-100 text-gray-800 border-gray-300'
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}
