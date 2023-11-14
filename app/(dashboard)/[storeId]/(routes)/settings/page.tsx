import { Store } from '@prisma/client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getStoreById } from '@/lib/api/stores';

import { DeleteStoreSettings } from './components/delete-store-setting';
import { SettingsApi } from './components/settings-api';
import { SettingsForm } from './components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const store = (await getStoreById(params.storeId)) as Store;

  return (
    <div className="flex-1 p-8 pt-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading title="Settings" description="Manage store preferences" />
        </div>
        <Separator />
      </div>
      <div className="space-y-8 pt-8">
        <SettingsForm initialData={store} />
        <SettingsApi />
        <DeleteStoreSettings store={store} />
      </div>
    </div>
  );
}
