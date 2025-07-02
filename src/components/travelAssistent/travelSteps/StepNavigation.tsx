import Button from '@/components/ui/Button/Button';
import { CircleChevronLeft, CircleChevronRight} from 'lucide-react';
type StepNavigationProps = {
  stepIndex: number;
  steps: string[];
  isStepValid: () => boolean;
  goBack: () => void;
  goNext: () => void;
  generateItinerary: () => Promise<void>;
  loading: boolean;
};

export default function StepNavigation({ stepIndex, steps, isStepValid, goBack, goNext, generateItinerary, loading }: StepNavigationProps) {
  return (
    <div className="flex justify-between mt-4">
      {stepIndex > 0 ? (
        <button onClick={goBack} className="px-4 py-2">
          <CircleChevronLeft size={46} strokeWidth={1.5} className='text-[#1483B4]'/>
        </button>

      ) : <div />}
     
      {stepIndex < steps.length - 1 ? (
        
        <button
          onClick={goNext}
          disabled={!isStepValid()}
          className="px-4 py-2 disabled:opacity-50 "
        >
          <CircleChevronRight size={46} strokeWidth={1.5} className='text-[#1483B4]'/>
        </button>
      ) : (
      
         <div className="h-[20vh] flex items-center justify-center">
          <Button
          onClick={generateItinerary}
          disabled={!isStepValid() || loading}
          variant="accent"
          size="xl"
        >
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </Button>
        </div>
        
      )}
      
    </div>
  );
}
