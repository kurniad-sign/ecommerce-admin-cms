import { getBillboards } from '@/lib/api/billboards';
import { getCategoryById } from '@/lib/api/categories';

import { CategoryForm } from './components/category-form';

export default async function BillboardPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  const category = await getCategoryById(params.categoryId);
  const billboards = await getBillboards(params.storeId);

  return (
    <div className="flex-1 p-8 pt-6 pr-0">
      <CategoryForm initialData={category} billboards={billboards} />
    </div>
  );
}
