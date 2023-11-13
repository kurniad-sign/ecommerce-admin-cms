import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getBillboards } from '@/lib/api/billboards';

import { BillboardColumn, columns } from './columns';

export async function BillboardData({ storeId }: { storeId: string }) {
  const billboards = await getBillboards(storeId);

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <DataTable columns={columns} data={formattedBillboards} searchKey="label" />
  );
}
