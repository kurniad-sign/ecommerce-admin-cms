import { format } from 'date-fns';

import prismadb from '@/lib/db';

import { SizesClient } from './components/client';
import { ColorsColumn } from './components/columns';

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColor: ColorsColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SizesClient data={formattedColor} />
    </div>
  );
}
