import { Suspense } from 'react';

import { TableSkeleton } from '@/components/skeletons/table-skeleton';
import { ApiList } from '@/components/ui/api-list';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { CategoryData } from './components/categoriy-data';
import { CategoryHeading } from './components/category-heading';

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <CategoryHeading />
      <Suspense fallback={<TableSkeleton />}>
        <CategoryData storeId={params.storeId} />
      </Suspense>
      <Heading title="API" description="API calls for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </div>
  );
}
