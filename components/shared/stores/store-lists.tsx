import { Store } from '@prisma/client';
import { format } from 'date-fns';
import { Link } from 'nextjs13-progress';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { getStores } from '@/lib/api/stores';

export async function StoreLists() {
  const stores = await getStores();

  return (
    <ul className="grid grid-cols-6 lg:grid-cols-12 gap-10 mt-8">
      {stores.map((store) => (
        <StoreList key={store.id} store={store} />
      ))}
    </ul>
  );
}

function StoreList({ store }: { store: Store }) {
  return (
    <li key={store.id} className="col-span-3 lg:col-span-4">
      <Link href={`/${store.id}`}>
        <Card className="h-80 flex flex-col">
          <CardHeader className="p-0">
            <div className="bg-zinc-100 dark:bg-zinc-900 h-32 flex items-center justify-center rounded-t-lg border-b">
              <span className="text-sm text-zinc-700 dark:text-zinc-200">
                Logo Store
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-auto p-6">
            <h4 className="text-xl font-medium mb-1">{store.name}</h4>
            <span className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-md">
              {store.store_id}
            </span>
          </CardContent>
          <CardFooter className="h-12 pb-0 border-t">
            <div className="text-xs text-zinc-700 dark:text-zinc-400">
              Updated: {format(new Date(store.updatedAt), 'MMM dd YYY, HH:mm')}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
}
