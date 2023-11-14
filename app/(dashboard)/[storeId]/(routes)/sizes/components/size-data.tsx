import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getSizes } from '@/lib/api/sizes';

import { columns, SizeColumn } from './columns';

export async function SizeData({ storeId }: { storeId: string }) {
  const sizes = await getSizes(storeId);

  const formattedSize: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return <DataTable columns={columns} data={formattedSize} searchKey="name" />;
}
