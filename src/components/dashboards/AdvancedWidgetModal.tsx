'use client';

import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import { AdvancedWidgetChartSelect } from '@/components/dashboards/AdvancedWidgetChartSelect';
import {
  AdvancedWidgetStepBreadcrumb,
  type AdvancedWidgetStep,
} from '@/components/dashboards/AdvancedWidgetStepBreadcrumb';
import {
  ADVANCED_WIDGET_TYPES,
  DEFAULT_ADVANCED_WIDGET_TYPE_ID,
  type AdvancedWidgetTypeId,
} from '@/data/mock-advanced-widget-types';
import styles from './AdvancedWidgetChartSelect.module.css';
import headerStyles from './DashboardTypeCard.module.css';

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

type ModalStep = AdvancedWidgetStep;

interface AdvancedWidgetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWidgetAdded?: () => void;
}

export function AdvancedWidgetModal({
  open,
  onOpenChange,
  onWidgetAdded,
}: AdvancedWidgetModalProps) {
  const { showToast } = useWuShowToast();
  const [step, setStep] = useState<ModalStep>('widget');
  const [widgetName, setWidgetName] = useState('');
  const [selectedTypeId, setSelectedTypeId] = useState<AdvancedWidgetTypeId>(
    DEFAULT_ADVANCED_WIDGET_TYPE_ID
  );

  const resetState = useCallback(() => {
    setStep('widget');
    setWidgetName('');
    setSelectedTypeId(DEFAULT_ADVANCED_WIDGET_TYPE_ID);
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

  function handleBreadcrumbClick(target: AdvancedWidgetStep): void {
    if (target === 'widget') {
      setStep('widget');
    } else if (target === 'chart') {
      setStep('chart');
    }
  }

  function handleNext(): void {
    const selectedType = ADVANCED_WIDGET_TYPES.find((t) => t.id === selectedTypeId);
    if (step === 'widget') {
      setStep('chart');
      return;
    }
    if (step === 'chart') {
      setStep('details');
      return;
    }
    showToast({
      message: widgetName.trim()
        ? `Widget "${widgetName.trim()}" (${selectedType?.name ?? 'Widget'}) added`
        : `${selectedType?.name ?? 'Widget'} added to dashboard`,
      variant: 'success',
    });
    onWidgetAdded?.();
    handleClose();
  }

  function handleBack(): void {
    if (step === 'details') {
      setStep('chart');
      return;
    }
    if (step === 'chart') {
      setStep('widget');
      return;
    }
    handleClose();
  }

  const nextLabel = step === 'details' ? 'Finish' : 'Next';

  return (
    <WuModal open={open} onOpenChange={handleOpenChange} maxWidth="960px" variant="action">
      <WuModalHeader className={headerStyles.modalTitle}>Add widget</WuModalHeader>

      <WuModalContent className="!overflow-y-auto !max-h-[75vh] !min-h-0 !p-0">
        {step === 'widget' && (
          <AdvancedWidgetChartSelect
            widgetName={widgetName}
            selectedTypeId={selectedTypeId}
            onWidgetNameChange={setWidgetName}
            onSelectType={setSelectedTypeId}
          />
        )}
        {step === 'chart' && (
          <p className={styles.stepPlaceholder}>
            Configure chart settings for{' '}
            <strong>{ADVANCED_WIDGET_TYPES.find((t) => t.id === selectedTypeId)?.name}</strong>.
            (Prototype — full chart configuration is not built yet.)
          </p>
        )}
        {step === 'details' && (
          <p className={styles.stepPlaceholder}>
            Review widget details and finish adding your widget to the dashboard.
          </p>
        )}
      </WuModalContent>

      <WuModalFooter>
        <div className="flex w-full items-center justify-between gap-4">
          <AdvancedWidgetStepBreadcrumb
            currentStep={step}
            onStepClick={handleBreadcrumbClick}
          />
          <div className="flex items-center gap-2 shrink-0">
            <WuButton variant="secondary" onClick={handleBack}>
              Back
            </WuButton>
            <WuButton onClick={handleNext}>{nextLabel}</WuButton>
          </div>
        </div>
      </WuModalFooter>
    </WuModal>
  );
}
