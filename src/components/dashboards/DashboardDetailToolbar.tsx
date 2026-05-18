'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import styles from './DashboardDetailToolbar.module.css';

const WuButton = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuButton })),
  { ssr: false }
);

interface DashboardDetailToolbarProps {
  name: string;
  onNameChange: (name: string) => void;
  showPresentation?: boolean;
}

export function DashboardDetailToolbar({
  name,
  onNameChange,
  showPresentation = true,
}: DashboardDetailToolbarProps) {
  const { showToast } = useWuShowToast();
  const [nameState, setNameState] = useState(name);
  const [inputWidth, setInputWidth] = useState(120);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setNameState(name);
  }, [name]);

  useEffect(() => {
    if (measureRef.current) {
      setInputWidth(measureRef.current.offsetWidth + 8);
    }
  }, [nameState]);

  const handleNameBlur = (): void => {
    const trimmed = nameState.trim();
    if (!trimmed) {
      setNameState(name);
      return;
    }
    if (trimmed !== name) {
      onNameChange(trimmed);
      showToast({
        message: `Dashboard renamed to '${trimmed}'`,
        variant: 'success',
      });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <span ref={measureRef} className={styles.nameMeasure}>
          {nameState || ' '}
        </span>
        <input
          type="text"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          onBlur={handleNameBlur}
          className={styles.nameInput}
          style={{ width: `${inputWidth}px` }}
          maxLength={100}
          aria-label="Dashboard name"
        />
      </div>

      <div className={styles.actions}>
        {showPresentation && (
          <WuButton
            variant="iconOnly"
            size="sm"
            aria-label="Presentation mode"
            onClick={() => showToast({ message: 'Preview mode', variant: 'success' })}
            Icon={<span className="wm-visibility" />}
          />
        )}
        <WuButton
          variant="secondary"
          className={styles.filterButton}
          onClick={() => showToast({ message: 'Filter', variant: 'success' })}
          Icon={<span className="wm-filter-alt" />}
        >
          Filter
        </WuButton>
        <WuButton
          variant="iconOnly"
          size="sm"
          aria-label="Download PDF"
          onClick={() => showToast({ message: 'PDF download started', variant: 'success' })}
          Icon={<span className="wm-download" />}
        />
        <WuButton
          variant="iconOnly"
          size="sm"
          aria-label="Share dashboard"
          onClick={() => showToast({ message: 'Share dashboard', variant: 'success' })}
          Icon={<span className="wm-share" />}
        />
        <WuButton
          variant="iconOnly"
          size="sm"
          aria-label="Dashboard settings"
          onClick={() => showToast({ message: 'Dashboard settings', variant: 'success' })}
          Icon={<span className="wm-settings" />}
        />
        <WuButton
          onClick={() => showToast({ message: 'Add widget', variant: 'success' })}
          Icon={<span className="wm-add-2" />}
        >
          Add widget
        </WuButton>
      </div>
    </header>
  );
}
