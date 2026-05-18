'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import type { IWuTableColumnDef } from '@npm-questionpro/wick-ui-lib';
import {
  getQuestionsBySurvey,
  type SurveyQuestion,
} from '@/data/mock-survey-questions';
import styles from './WidgetQuestionSelection.module.css';

const WuInput = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuInput })),
  { ssr: false }
);
const WuTable = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuTable })),
  { ssr: false }
);

interface WidgetQuestionSelectionProps {
  surveyId: number;
  selectedQuestionId: number | null;
  onSelectQuestion: (question: SurveyQuestion) => void;
}

export function WidgetQuestionSelection({
  surveyId,
  selectedQuestionId,
  onSelectQuestion,
}: WidgetQuestionSelectionProps) {
  const [search, setSearch] = useState('');

  const questions = useMemo(() => getQuestionsBySurvey(surveyId), [surveyId]);

  const columns: IWuTableColumnDef<SurveyQuestion>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
      enableSorting: true,
      size: 80,
    },
    {
      accessorKey: 'text',
      header: 'Questions',
      filterable: true,
      enableSorting: true,
      cell: ({ row }) => {
        const question = row.original;
        const isSelected = selectedQuestionId === question.id;
        return (
          <span className={styles.questionRow}>
            {question.hasSubQuestions && (
              <span className={`wm-chevron-right ${styles.subIcon}`} aria-hidden />
            )}
            <button
              type="button"
              className={styles.questionLink}
              style={isSelected ? { fontWeight: 600 } : undefined}
              onClick={() => onSelectQuestion(question)}
            >
              {question.text}
            </button>
          </span>
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      enableSorting: true,
      size: 140,
    },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.searchRow}>
        <WuInput
          variant="outlined"
          placeholder="Search by Question nar"
          Icon={<span className="wm-search" />}
          iconPosition="left"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.tableArea}>
        <WuTable
          data={questions as unknown[]}
          columns={columns as unknown as IWuTableColumnDef<unknown>[]}
          variant="striped"
          sort={{ enabled: true }}
          filterText={search}
        />
      </div>
    </div>
  );
}
