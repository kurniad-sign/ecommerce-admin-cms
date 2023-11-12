import { Suspense } from 'react';

import { CreateStore } from '@/components/shared/stores/create-store';
import { StoreLists } from '@/components/shared/stores/store-lists';
import { StoreSkeleton } from '@/components/skeletons/store-skeleton';

export default function StoresPage() {
  return (
    <main className="flex-auto">
      <div className="lg:max-w-[1024px] px-8 lg:px-0 mx-auto py-16">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-general-sans font-semibold tracking-[0.3px]">
            Your stores
          </h1>
          <CreateStore />
        </div>
        <Suspense fallback={<StoreSkeleton />}>
          <StoreLists />
        </Suspense>
      </div>
    </main>
  );
}
