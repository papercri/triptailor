'use client';
import { useState } from 'react';
import { ItineraryItem } from '@/types/itineraryItem';
import { getAIPrompt } from '@/utils/getAiPrompt';

export default function useTravelForm(destination: string) {
  const [form, setForm] = useState({
    travelerType: '',
    budget: '',
    days: 0,
    season: '',
    interests: [] as string[],
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryItem[] | null>(null);

  const goNext = () => setStepIndex((prev) => Math.min(prev + 1, 5));
  const goBack = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const handleSelect = (key: string, value: string) => {
  setForm((prev) => ({
      ...prev,
      [key]: key === 'days' ? Number(value) : value,
    }));
  };

  const toggleInterest = (interest: string) => {
    setForm((prev) => {
      const updated = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const isStepValid = () => {
    if (stepIndex === 0) return !!form.travelerType;
    if (stepIndex === 1) return !!form.budget;
    if (stepIndex === 2) return form.days > 0;
    if (stepIndex === 3) return !!form.season;
    if (stepIndex === 4) return form.interests.length > 0;
    return true;
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
    - Limit to a maximum of 3 activities per day.
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

  return {
    form,
    stepIndex,
    loading,
    itinerary,
    goNext,
    goBack,
    handleSelect,
    toggleInterest,
    isStepValid,
    generateItinerary,
    setStepIndex
  };
}
