'use client';

import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import styles from './DashboardWidgetCard.module.css';

interface DashboardWidgetCardProps {
  title: string;
  children: React.ReactNode;
  dragHandleClassName?: string;
}

export function DashboardWidgetCard({
  title,
  children,
  dragHandleClassName,
}: DashboardWidgetCardProps) {
  const { showToast } = useWuShowToast();

  return (
    <article className={styles.card}>
      <header className={`${styles.header} ${dragHandleClassName ?? ''}`.trim()}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.actions}>
          <button type="button" className={styles.actionBtn} aria-label="Insights">
            <span className="wm-lightbulb-outline" />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            aria-label="Highlight widget"
            onClick={() => showToast({ message: 'Widget highlighted', variant: 'success' })}
          >
            <span className="wm-diamond" />
          </button>
          <button type="button" className={styles.actionBtn} aria-label="Widget menu">
            <span className="wm-more-vert" />
          </button>
        </div>
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
