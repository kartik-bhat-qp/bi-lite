'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import { AiDataSourceSelection } from '@/components/dashboards/AiDataSourceSelection';
import { AiDashboardConfirmation } from '@/components/dashboards/AiDashboardConfirmation';
import { CreateDashboardStepBreadcrumb } from '@/components/dashboards/CreateDashboardStepBreadcrumb';
import { WuLoaderWrapper } from '@/components/ui/WuLoaderWrapper';
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
const WuInput = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuInput })),
  { ssr: false }
);
const WuFormGroup = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuFormGroup })),
  { ssr: false }
);
const WuLabel = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuLabel })),
  { ssr: false }
);
const WuHelpButton = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuHelpButton })),
  { ssr: false }
);

type DashboardType = 'blank' | 'ai';
type WizardStep = 'type' | 'survey' | 'confirmation';

export interface CreateDashboardSurvey {
  id: number;
  name: string;
}

interface CreateDashboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultName: string;
  onCreate: (name: string, type: DashboardType, survey?: CreateDashboardSurvey) => void;
}

interface DashboardTypeCardProps {
  selected: boolean;
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
  helpButton?: React.ReactNode;
  onSelect: () => void;
}

function DashboardTypeCard({
  selected,
  iconSrc,
  iconAlt,
  title,
  description,
  helpButton,
  onSelect,
}: DashboardTypeCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`${styles.card} ${selected ? styles.cardSelected : ''}`}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={64}
        height={64}
        className={styles.icon}
      />
      <div className={styles.textContainer}>
        <div className={styles.title}>
          {title}
          {helpButton}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

function stepToBreadcrumb(step: WizardStep): 'dashboard' | 'survey' | 'confirmation' {
  if (step === 'type') return 'dashboard';
  if (step === 'survey') return 'survey';
  return 'confirmation';
}

export function CreateDashboardModal({
  open,
  onOpenChange,
  defaultName,
  onCreate,
}: CreateDashboardModalProps) {
  const { showToast } = useWuShowToast();
  const [step, setStep] = useState<WizardStep>('type');
  const [dashboardType, setDashboardType] = useState<DashboardType>('blank');
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState<SurveyListItem | null>(null);

  const resetWizard = useCallback(() => {
    setStep('type');
    setName('');
    setDashboardType('blank');
    setIsNameError(false);
    setSelectedSurvey(null);
  }, []);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) resetWizard();
      onOpenChange(nextOpen);
    },
    [onOpenChange, resetWizard]
  );

  function handleClose() {
    handleOpenChange(false);
  }

  function getTrimmedName(): string {
    return (name.trim() || defaultName).trim();
  }

  function validateName(): boolean {
    const trimmed = getTrimmedName();
    if (!trimmed) {
      setIsNameError(true);
      return false;
    }
    return true;
  }

  async function handleTypeContinue() {
    if (!validateName()) return;

    if (dashboardType === 'blank') {
      setIsSaving(true);
      onCreate(getTrimmedName(), 'blank');
      setIsSaving(false);
      handleClose();
      return;
    }

    setStep('survey');
  }

  function handleSurveyNext() {
    if (!selectedSurvey) {
      showToast({ message: 'Select a survey to continue', variant: 'error' });
      return;
    }
    setStep('confirmation');
  }

  function handleBreadcrumbClick(target: 'dashboard' | 'survey' | 'confirmation') {
    if (target === 'dashboard') setStep('type');
    if (target === 'survey') setStep('survey');
  }

  async function handleCreate() {
    if (!selectedSurvey) return;
    setIsSaving(true);
    onCreate(getTrimmedName(), 'ai', {
      id: selectedSurvey.id,
      name: selectedSurvey.name,
    });
    setIsSaving(false);
    handleClose();
  }

  const modalWidth = step === 'type' ? '700px' : '900px';

  return (
    <WuModal open={open} onOpenChange={handleOpenChange} maxWidth={modalWidth} variant="action">
      <WuModalHeader className={styles.modalTitle}>Create dashboard</WuModalHeader>

      <WuLoaderWrapper showLoader={isSaving} className="min-h-[200px]">
      {step === 'type' && (
        <WuModalContent className="!overflow-hidden !min-h-0">
          <WuFormGroup
            Label={<WuLabel>Name</WuLabel>}
            Error={isNameError ? 'Dashboard name is required' : undefined}
            Input={
              <WuInput
                variant="outlined"
                placeholder={defaultName}
                value={name}
                autoFocus
                maxLength={100}
                onChange={(e) => {
                  if (isNameError && e.target.value.trim()) setIsNameError(false);
                  setName(e.target.value);
                }}
              />
            }
          />

          <div className="grid grid-cols-2 gap-[18px] mt-5 w-full min-w-0">
            <DashboardTypeCard
              selected={dashboardType === 'blank'}
              iconSrc="/images/create-dashboard/blank-dashboard.svg"
              iconAlt="Blank dashboard"
              title="Blank dashboard"
              description="Fill your dashboard with customizable widgets"
              onSelect={() => setDashboardType('blank')}
            />
            <DashboardTypeCard
              selected={dashboardType === 'ai'}
              iconSrc="/images/create-dashboard/qxbot-dashboard.svg"
              iconAlt="AI dashboard"
              title="AI dashboard"
              description="Create a dashboard using AI for your survey"
              helpButton={
                <span
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                  role="presentation"
                >
                  <WuHelpButton
                    idOrSlugOrUrl="ai-dashboard"
                    variant="primary"
                    onClick={() =>
                      showToast({
                        message: 'AI dashboard creates widgets from your survey data',
                        variant: 'success',
                      })
                    }
                  />
                </span>
              }
              onSelect={() => setDashboardType('ai')}
            />
          </div>
        </WuModalContent>
      )}

      {step === 'survey' && (
        <WuModalContent className="!overflow-y-auto !max-h-[70vh] !min-h-0 !p-0">
          <AiDataSourceSelection
            selectedSurveyId={selectedSurvey?.id ?? null}
            onSelectSurvey={setSelectedSurvey}
          />
        </WuModalContent>
      )}

      {step === 'confirmation' && selectedSurvey && (
        <WuModalContent className="!overflow-hidden !min-h-0">
          <AiDashboardConfirmation surveyName={selectedSurvey.name} />
        </WuModalContent>
      )}
      </WuLoaderWrapper>

      <WuModalFooter>
        {step === 'type' ? (
          <>
            <WuButton variant="secondary" onClick={handleClose}>
              Cancel
            </WuButton>
            <WuButton onClick={handleTypeContinue} disabled={isSaving}>
              Continue
            </WuButton>
          </>
        ) : (
          <div className="flex w-full items-center justify-between gap-4">
            <CreateDashboardStepBreadcrumb
              currentStep={stepToBreadcrumb(step)}
              onStepClick={handleBreadcrumbClick}
            />
            <div className="flex items-center gap-2 shrink-0">
              <WuButton
                variant="secondary"
                onClick={() => setStep(step === 'confirmation' ? 'survey' : 'type')}
              >
                Back
              </WuButton>
              {step === 'survey' ? (
                <WuButton onClick={handleSurveyNext}>Next</WuButton>
              ) : (
                <WuButton onClick={handleCreate} disabled={isSaving}>
                  Create
                </WuButton>
              )}
            </div>
          </div>
        )}
      </WuModalFooter>
    </WuModal>
  );
}
