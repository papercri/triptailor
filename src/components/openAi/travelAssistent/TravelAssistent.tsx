'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIPrompt } from '@/utils/getAiPrompt';
import { FaHiking, FaSpa, FaLandmark, FaUtensils, FaChild, FaUser } from 'react-icons/fa';

const steps = ['Traveler Type', 'Budget', 'Days', 'Season', 'Interests'];

export default function TravelAssistantSteps({ destination }: { destination: string }) {
  const [form, setForm] = useState({
    travelerType: '',
    budget: '',
    days: '',
    season: '',
    interests: [] as string[],
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const nextStep = () => setStepIndex((prev) => prev + 1);

  const handleSelect = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    nextStep();
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const updated = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const generateItinerary = async () => {
    setLoading(true);
    const { travelerType, budget, days, season, interests } = form;
    const interestsString = interests.join(', ');
    const prompt = `You are TripTailor, a helpful travel assistant. Generate a ${days}-days with ${budget} budget travel itinerary in ${destination} for a ${travelerType} traveler who enjoys ${interestsString}, during the ${season}. The output must:
- Be in English.
- Skip any introduction or farewell.
- Use HTML-friendly formatting (e.g., <strong> instead of **).
- Keep each day's plan short and clear.
- Include real places and links if relevant.
- Avoid overly descriptive text, be friendly, concise and practical.
Output only the itinerary.`;
    const result = await getAIPrompt(prompt);
    setItinerary(result);
    setLoading(false);
  };

  // Motion animation variants
  const stepAnimation = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.3 },
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

      {/* Animated step content */}
      <AnimatePresence mode="wait">
        <motion.div key={stepIndex} {...stepAnimation} className="space-y-4">
          {stepIndex === 0 && (
            <div>
              <p className="mb-2 font-medium">What kind of traveler are you?</p>
              <div className="grid grid-cols-3 gap-2">
                <StepButton icon={<FaHiking />} label="Adventure" onClick={() => handleSelect('travelerType', 'Adventure')} />
                <StepButton icon={<FaSpa />} label="Relax" onClick={() => handleSelect('travelerType', 'Relax')} />
                <StepButton icon={<FaLandmark />} label="Culture" onClick={() => handleSelect('travelerType', 'Culture')} />
                <StepButton icon={<FaUtensils />} label="Food" onClick={() => handleSelect('travelerType', 'Food')} />
                <StepButton icon={<FaChild />} label="Kids" onClick={() => handleSelect('travelerType', 'With children')} />
                <StepButton icon={<FaUser />} label="Solo" onClick={() => handleSelect('travelerType', 'Solo')} />
              </div>
            </div>
          )}

          {stepIndex === 1 && (
            <div>
              <p className="mb-2 font-medium">Select your budget per day:</p>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button key={level} onClick={() => handleSelect('budget', level)} className="p-2 px-4 bg-gray-100 hover:bg-blue-100 rounded">
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
                  <button key={day} onClick={() => handleSelect('days', day)} className="p-2 px-4 bg-gray-100 hover:bg-blue-100 rounded">
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div>
              <p className="mb-2 font-medium">Choose the season of your trip:</p>
              <div className="flex gap-2">
                {['Spring', 'Summer', 'Autumn', 'Winter'].map((season) => (
                  <button key={season} onClick={() => handleSelect('season', season)} className="p-2 px-4 bg-gray-100 hover:bg-blue-100 rounded">
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
                {['Museums', 'Nature', 'Beaches', 'Gastronomy', 'Shopping', 'History'].map((interest) => (
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
                ))}
              </div>
              <button
                onClick={generateItinerary}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                {loading ? 'Generating...' : 'Generate Itinerary'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {itinerary && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Your Itinerary</h3>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: itinerary }} />
        </div>
      )}
    </div>
  );
}

function StepButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-3 bg-gray-100 hover:bg-blue-100 rounded flex flex-col items-center">
      <div className="text-2xl">{icon}</div>
      <span className="text-sm mt-1">{label} </span>
    </button>
  );
}
