import { getColorById } from '@/lib/api/colors';

import { ColorForm } from './components/color-form';

export default async function ColorPage({
  params,
}: {
  params: { colorId: string };
}) {
  const color = await getColorById(params.colorId);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <ColorForm initialData={color} />
    </div>
  );
}
