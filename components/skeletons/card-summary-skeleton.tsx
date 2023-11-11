import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function CardSummarySkeleton() {
  return (
    <div className="grid gap-4 grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
          <Skeleton className="h-3 w-2/5 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-1/5 rounded-md" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
          <Skeleton className="h-3 w-2/5 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-1/5 rounded-md" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
          <Skeleton className="h-3 w-2/5 rounded-md" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-1/5 rounded-md" />
        </CardContent>
      </Card>
    </div>
  );
}
