import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { ApiList } from '@/components/ui/api-list';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ColorData } from './components/color-data';
import { ColorHeading } from './components/color-heading';

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <ColorHeading />
      <Suspense fallback={<TableSkeleton />}>
        <ColorData storeId={params.storeId} />
      </Suspense>

      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorsId" />
    </div>
  );
}
