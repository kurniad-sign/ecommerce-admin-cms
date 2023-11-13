import { getSizeById } from '@/lib/api/sizes';

import { SizeForm } from './components/size-form';

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  const size = await getSizeById(params.sizeId);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <SizeForm initialData={size} />
    </div>
  );
}
