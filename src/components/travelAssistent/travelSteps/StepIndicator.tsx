type StepIndicatorProps = {
  steps: string[];
  currentStep: number;
};

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="step-indicators">
  {steps.map((step, i) => (
    <div key={i} className="step-indicator">
      <div
        className={`step-circle ${i === currentStep
          ? 'step-current'
          : i < currentStep
          ? 'step-completed'
          : 'step-upcoming'}`}
      >
        {i + 1}
      </div>
      <p className="step-label">{step}</p>
    </div>
  ))}
</div>

  );
}
