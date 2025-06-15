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
        <button onClick={goBack} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">← Back</button>
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
          onClick={generateItinerary}
          disabled={!isStepValid() || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </button>
      )}
    </div>
  );
}
