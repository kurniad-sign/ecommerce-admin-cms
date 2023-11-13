import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';

import { OrderData } from './components/order-data';
import { OrderHeading } from './components/order-heading';

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <OrderHeading />
      <Suspense fallback={<TableSkeleton />}>
        <OrderData storeId={params.storeId} />
      </Suspense>
    </div>
  );
}
