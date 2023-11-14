import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { ApiList } from '@/components/ui/api-list';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { ProductData } from './components/product-data';
import { ProductHeading } from './components/product-heading';

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <ProductHeading />
      <Suspense fallback={<TableSkeleton />}>
        <ProductData storeId={params.storeId} />
      </Suspense>
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </div>
  );
}
