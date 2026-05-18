'use client';

import { PageHeader } from '@/components/ui/PageHeader';

interface FeaturePlaceholderPageProps {
  title: string;
  description: string;
}

export function FeaturePlaceholderPage({
  title,
  description,
}: FeaturePlaceholderPageProps) {
  return (
    <div className="p-6">
      <PageHeader title={title} description={description} />
      <p className="text-sm text-gray-500">
        This screen is a placeholder for the BI Lite prototype.
      </p>
    </div>
  );
}
