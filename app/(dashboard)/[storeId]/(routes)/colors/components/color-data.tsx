import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getColors } from '@/lib/api/colors';

import { ColorsColumn, columns } from './columns';

export async function ColorData({ storeId }: { storeId: string }) {
  const colors = await getColors(storeId);

  const formattedColor: ColorsColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return <DataTable columns={columns} data={formattedColor} searchKey="name" />;
}
