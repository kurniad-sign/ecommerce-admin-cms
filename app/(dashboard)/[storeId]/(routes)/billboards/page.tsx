import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { ApiList } from '@/components/ui/api-list';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { BillboardData } from './components/billboard-data';
import { BillboardHeading } from './components/billboard-heading';

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <BillboardHeading />
      <Suspense fallback={<TableSkeleton />}>
        <BillboardData storeId={params.storeId} />
      </Suspense>
      <Heading title="API" description="API calls for billboard" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </div>
  );
}
