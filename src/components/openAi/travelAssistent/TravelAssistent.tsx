'use client';


import useTravelForm from '@/hooks/useTravelForm';
import TravelResult from './travelResult/TravelResult';
import StepContent from '@/components/openAi/travelAssistent/travelSteps/StepContent';
import StepIndicator from './travelSteps/StepIndicator';
import StepNavigation from './travelSteps/StepNavigation';
import "@/styles/travelAssistent.scss";
import { useUser } from '@/context/UserContext';




const steps = ['Traveler Type', 'Budget', 'Days', 'Season', 'Interests', 'Your Itinerary'];

export default function TravelAssistantSteps({ destination }: { destination: string }) {
  const { user } = useUser();
  const userId = user?.uid ?? 'guest';

  const {
    form, stepIndex, loading, itinerary,
    goNext, goBack, handleSelect,
    toggleInterest, isStepValid, generateItinerary, setStepIndex
  } = useTravelForm(destination);

  return (
    <div className="travel-assistent">
          <h2 className='title'>Plan your Trip to {destination}</h2>
    
          <StepIndicator steps={steps} currentStep={stepIndex} />
    
          <StepContent
            stepIndex={stepIndex}
            form={form}
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
    
          {stepIndex === 5 && itinerary && (
            <TravelResult
              itinerary={itinerary}
              destination={destination}
              userId={userId}
              userEmail={user?.email}
            />
          )}
        </div>
  );
}
