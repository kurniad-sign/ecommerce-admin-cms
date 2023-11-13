import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { ApiList } from '@/components/ui/api-list';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { SizeData } from './components/size-data';
import { SizeHeading } from './components/size-heading';

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <SizeHeading />
      <Suspense fallback={<TableSkeleton />}>
        <SizeData storeId={params.storeId} />
      </Suspense>
      <Heading title="API" description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </div>
  );
}
