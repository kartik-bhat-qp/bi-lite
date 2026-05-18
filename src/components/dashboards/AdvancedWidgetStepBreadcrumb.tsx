'use client';

export type AdvancedWidgetStep = 'widget' | 'chart' | 'details';

const STEPS: { id: AdvancedWidgetStep; label: string; icon: string }[] = [
  { id: 'widget', label: 'Widget', icon: 'wm-grid-view' },
  { id: 'chart', label: 'Chart', icon: 'wm-forum' },
  { id: 'details', label: 'Details', icon: 'wm-bar-chart' },
];

interface AdvancedWidgetStepBreadcrumbProps {
  currentStep: AdvancedWidgetStep;
  onStepClick?: (step: AdvancedWidgetStep) => void;
}

export function AdvancedWidgetStepBreadcrumb({
  currentStep,
  onStepClick,
}: AdvancedWidgetStepBreadcrumbProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav className="flex items-center gap-1 text-sm" aria-label="Add advanced widget progress">
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;
        const isClickable = isComplete && onStepClick;

        return (
          <span key={step.id} className="flex items-center gap-1">
            {index > 0 && <span className="wm-chevron-right text-gray-300 text-xs mx-0.5" />}
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onStepClick(step.id)}
              className={`flex items-center gap-1.5 px-1 py-0.5 rounded ${
                isActive
                  ? 'text-[#1b87e6] font-medium'
                  : isComplete
                    ? 'text-[#1b87e6] hover:underline cursor-pointer'
                    : 'text-gray-400 cursor-default'
              }`}
            >
              <span className={`${step.icon} text-base`} />
              {step.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
}
