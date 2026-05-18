'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import * as Dialog from '@radix-ui/react-dialog';
import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import { AiDataSourceSelection } from '@/components/dashboards/AiDataSourceSelection';
import {
  AddWidgetStepBreadcrumb,
  type AddWidgetStep,
} from '@/components/dashboards/AddWidgetStepBreadcrumb';
import { WidgetQuestionSelection } from '@/components/dashboards/WidgetQuestionSelection';
import type { SurveyQuestion } from '@/data/mock-survey-questions';
import type { SurveyListItem } from '@/data/mock-survey-folders';
import styles from './DashboardTypeCard.module.css';

const WuModal = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuModal })),
  { ssr: false }
);
const WuModalHeader = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuModalHeader })),
  { ssr: false }
);
const WuModalContent = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuModalContent })),
  { ssr: false }
);
const WuModalFooter = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuModalFooter })),
  { ssr: false }
);
const WuButton = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuButton })),
  { ssr: false }
);

type ModalStep = 'survey' | 'question';

interface QuestionBasedWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddWidget?: (survey: SurveyListItem, question: SurveyQuestion) => void;
}

export function QuestionBasedWidgetModal({
  open,
  onOpenChange,
  onAddWidget,
}: QuestionBasedWidgetModalProps) {
  const { showToast } = useWuShowToast();
  const [step, setStep] = useState<ModalStep>('survey');
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyListItem | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<SurveyQuestion | null>(null);

  const resetState = useCallback(() => {
    setStep('survey');
    setSelectedSurvey(null);
    setSelectedQuestion(null);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) resetState();
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetState]
  );

  function handleClose(): void {
    handleOpenChange(false);
  }

  function handleSurveySelect(survey: SurveyListItem): void {
    setSelectedSurvey(survey);
    setSelectedQuestion(null);
    setStep('question');
  }

  function handleQuestionSelect(question: SurveyQuestion): void {
    setSelectedQuestion(question);
    if (selectedSurvey) {
      onAddWidget?.(selectedSurvey, question);
      showToast({
        message: `Selected ${question.code}: ${question.text}`,
        variant: 'success',
      });
    }
  }

  function handleBreadcrumbClick(target: AddWidgetStep): void {
    if (target === 'widget') {
      handleClose();
      return;
    }
    if (target === 'survey') {
      setStep('survey');
      setSelectedQuestion(null);
    }
  }

  const breadcrumbStep: AddWidgetStep = step === 'survey' ? 'survey' : 'question';

  return (
    <WuModal open={open} onOpenChange={handleOpenChange} maxWidth="900px" variant="action">
      <WuModalHeader>
        <Dialog.Title className={styles.modalTitle}>Add widget</Dialog.Title>
      </WuModalHeader>

      <WuModalContent className="!overflow-y-auto !max-h-[70vh] !min-h-0 !p-0">
        {step === 'survey' ? (
          <AiDataSourceSelection
            selectedSurveyId={selectedSurvey?.id ?? null}
            onSelectSurvey={handleSurveySelect}
          />
        ) : (
          selectedSurvey && (
            <WidgetQuestionSelection
              surveyId={selectedSurvey.id}
              selectedQuestionId={selectedQuestion?.id ?? null}
              onSelectQuestion={handleQuestionSelect}
            />
          )
        )}
      </WuModalContent>

      <WuModalFooter>
        <div className="flex w-full items-center justify-between gap-4">
          <AddWidgetStepBreadcrumb
            currentStep={breadcrumbStep}
            onStepClick={handleBreadcrumbClick}
          />
          <div className="flex items-center gap-2 shrink-0">
            {step === 'question' ? (
              <WuButton variant="secondary" onClick={() => setStep('survey')}>
                Back
              </WuButton>
            ) : (
              <WuButton variant="secondary" onClick={handleClose}>
                Cancel
              </WuButton>
            )}
          </div>
        </div>
      </WuModalFooter>
    </WuModal>
  );
}
