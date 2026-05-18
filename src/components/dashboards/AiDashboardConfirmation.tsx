'use client';

interface AiDashboardConfirmationProps {
  surveyName: string;
}

export function AiDashboardConfirmation({ surveyName }: AiDashboardConfirmationProps) {
  return (
    <div className="py-10 px-6 text-center">
      <p className="text-base text-gray-900">
        Are you sure you want to create an AI dashboard from &ldquo;{surveyName}&rdquo; survey?
      </p>
      <p className="mt-3 text-sm text-gray-500">
        When you create, QuestionPro will automatically generate widgets for you.
      </p>
    </div>
  );
}
