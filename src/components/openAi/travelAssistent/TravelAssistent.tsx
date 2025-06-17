'use client';


import useTravelForm from '@/hooks/useTravelForm';
import TravelResult from './travelResult/TravelResult';
import StepContent from '@/components/openAi/travelAssistent/travelSteps/StepContent';
import StepIndicator from './travelSteps/StepIndicator';
import StepNavigation from './travelSteps/StepNavigation';
import "@/styles/travelAssistent.scss";
import { useUser } from '@/context/UserContext';
import Button from '@/components/ui/Button/Button';


const steps = ['Traveler Type', 'Budget', 'Days', 'Season', 'Interests', 'Your Itinerary'];

export default function TravelAssistantSteps({ destination }: { destination: string }) {
  const { user } = useUser();
  const userId = user?.uid ?? 'guest';

  const {
    form, stepIndex, loading, itinerary,
    goNext, goBack, handleSelect,
    toggleInterest, isStepValid, generateItinerary, setStepIndex
  } = useTravelForm(destination);

   // Si estamos en el último paso y hay resultado, mostramos solo TravelResult
  if (stepIndex === 5 && itinerary) {
    return (
      <div className="travel-assistent itinerary-view">
        <h2 className='title'>Your Itinerary for {destination}</h2>

        <TravelResult
          itinerary={itinerary}
          destination={destination}
          userId={userId}
          userEmail={user?.email}
          form={form} 
        />

        <div className="flex justify-between mt-6 gap-4">
          <Button variant="secondary" onClick={() => setStepIndex(4)}>
            ← Back
          </Button>
          <Button variant="danger" onClick={() => setStepIndex(0)}>
            ✕ Close
          </Button>
        </div>
      </div>
    );
  }

  // Resto de pasos normales
  return (
    <div className="travel-assistent">
      <h2 className='title'>Plan your Trip to {destination}</h2>

      <StepIndicator steps={steps} currentStep={stepIndex} />

      <StepContent
        stepIndex={stepIndex}
        form={{ ...form, days: String(form.days) }}
        handleSelect={handleSelect}
        toggleInterest={toggleInterest}
      />

      <StepNavigation
        stepIndex={stepIndex}
        steps={steps}
        isStepValid={isStepValid}
        goBack={goBack}
        goNext={goNext}
        generateItinerary={() => generateItinerary().then(() => setStepIndex(5))}
        loading={loading}
      />
    </div>
  );
}