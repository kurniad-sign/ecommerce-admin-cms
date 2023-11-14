import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getCategories } from '@/lib/api/categories';

import { CategoryColumn, columns } from './columns';

export async function CategoryData({ storeId }: { storeId: string }) {
  const categories = await getCategories(storeId);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <DataTable columns={columns} data={formattedCategories} searchKey="name" />
  );
}
