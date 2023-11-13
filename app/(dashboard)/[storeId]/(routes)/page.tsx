import { Suspense } from 'react';

import { CardOverviewProduct } from '@/components/shared/dashboard/card-overview-product';
import { CardSummaryProduct } from '@/components/shared/dashboard/card-summary-product';
import { CardOverviewSkeleton } from '@/components/skeletons/card-overview-skeleton';
import { CardSummarySkeleton } from '@/components/skeletons/card-summary-skeleton';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

interface DashboardPageProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <Heading title="Dashboard" description="overview of your store" />
      <Separator />
      <div className="space-y-4 pt-4">
        <Suspense fallback={<CardSummarySkeleton />}>
          <CardSummaryProduct storeId={params.storeId} />
        </Suspense>
        <Suspense fallback={<CardOverviewSkeleton />}>
          <CardOverviewProduct storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  );
}
