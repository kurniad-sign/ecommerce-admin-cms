import { CreateStore } from '@/components/shared/stores/create-store';
import { StoreLists } from '@/components/shared/stores/store-lists';

export default function StoresPage() {
  return (
    <main className="h-[calc(100%-104px)]">
      <div className="lg:max-w-[1024px] px-8 lg:px-0 mx-auto py-16">
        <div className="flex items-end justify-between">
          <h1 className="text-4xl font-general-sans font-medium">
            Your stores
          </h1>
          <CreateStore />
        </div>
        <StoreLists />
      </div>
    </main>
  );
}
