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
          <CircleChevronLeft size={36} strokeWidth={0.5}/>
        </button>

      ) : <div />}
      {stepIndex < steps.length - 1 ? (
        <button
          onClick={goNext}
          disabled={!isStepValid()}
          className="px-4 py-2 disabled:opacity-50"
        >
          <CircleChevronRight size={36} strokeWidth={0.5} />
        </button>
      ) : (
      

        <Button
          onClick={generateItinerary}
          disabled={!isStepValid() || loading}
          variant="primary"
          size="sm"
        >
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </Button>
      )}
    </div>
  );
}
