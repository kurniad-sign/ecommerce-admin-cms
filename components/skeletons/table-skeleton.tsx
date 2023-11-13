import { Loader2 } from 'lucide-react';

import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function TableSkeleton() {
  return (
    <div>
      <div className="flex items-center py-4">
        <Skeleton className="h-9 w-2/5 rounded-md" />
      </div>
      <Card className="border h-[200px] flex items-center justify-center mt-0">
        <Loader2 className="w-14 h-14 animate-spin repeat-infinite" />
      </Card>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-7 w-20 rounded-md" />
        <Skeleton className="h-7 w-20 rounded-md" />
      </div>
    </div>
  );
}
