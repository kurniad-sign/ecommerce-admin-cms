import { getBillboardById } from '@/lib/api/billboards';

import { BillboardForm } from './components/billboard-form';

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await getBillboardById(params.billboardId);

  return (
    <div className="flex-1 p-8 pt-6 pr-0">
      <BillboardForm initialData={billboard} />
    </div>
  );
}
