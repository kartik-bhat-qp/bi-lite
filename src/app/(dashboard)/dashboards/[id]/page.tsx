'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useWuShowToast } from '@npm-questionpro/wick-ui-lib';
import { AiDashboardCanvas } from '@/components/dashboards/AiDashboardCanvas';
import { DashboardDetailToolbar } from '@/components/dashboards/DashboardDetailToolbar';
import { EmptyState } from '@/components/ui/EmptyState';
import { getDashboardById } from '@/data/get-dashboard-by-id';

const WuButton = dynamic(
  () => import('@npm-questionpro/wick-ui-lib').then((m) => ({ default: m.WuButton })),
  { ssr: false }
);

function DashboardDetailContent({ numericId }: { numericId: number }) {
  const dashboard = getDashboardById(numericId);
  const { showToast } = useWuShowToast();
  const [name, setName] = useState(dashboard?.name ?? 'Untitled');

  if (!dashboard) {
    return (
      <div className="p-6">
        <EmptyState
          icon="wm-dashboard"
          title="Dashboard cannot be loaded."
          description="This dashboard may have been deleted or you do not have access."
          action={
            <Link href="/dashboards">
              <WuButton>Back to dashboards</WuButton>
            </Link>
          }
        />
      </div>
    );
  }

  const isAiDashboard = dashboard.type === 'ai';

  return (
    <div className="flex flex-col h-full min-h-0">
      <DashboardDetailToolbar
        name={name}
        onNameChange={setName}
        showPresentation={isAiDashboard}
      />

      {isAiDashboard ? (
        <AiDashboardCanvas />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 text-center min-h-0">
          <span className="wm-dashboard text-5xl text-gray-300 mb-4" />
          <h2 className="text-lg font-medium text-gray-900">Add your first widget</h2>
          <p className="text-sm text-gray-500 mt-2 max-w-md">
            Fill your dashboard with customizable widgets based on your survey data
          </p>
          <WuButton
            className="mt-6"
            onClick={() => showToast({ message: 'Widget added successfully', variant: 'success' })}
            Icon={<span className="wm-add-2" />}
          >
            Add widget
          </WuButton>
        </div>
      )}

      <div className="border-t border-gray-200 bg-gray-50 px-4 py-2 flex items-center gap-2 shrink-0">
        <button
          type="button"
          className="px-3 py-1.5 rounded text-sm font-medium bg-white border border-gray-200 shadow-sm"
        >
          Tab-1
        </button>
        <WuButton size="sm" variant="secondary" Icon={<span className="wm-add" />} />
      </div>
    </div>
  );
}

export default function DashboardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const numericId = Number(id);

  return <DashboardDetailContent key={numericId} numericId={numericId} />;
}
