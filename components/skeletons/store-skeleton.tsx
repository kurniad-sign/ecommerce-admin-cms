import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export function StoreSkeleton() {
  return (
    <ul className="grid grid-cols-6 lg:grid-cols-12 gap-10 mt-8">
      <li className="col-span-3 lg:col-span-4">
        <Card className="h-80 flex flex-col">
          <CardHeader className="p-0">
            <div className="bg-zinc-100 dark:bg-zinc-900 h-32 flex items-center justify-center rounded-t-lg border-b">
              <Skeleton className="h-8 w-2/5 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="flex-auto p-6">
            <Skeleton className="h-4 w-2/5" />
          </CardContent>
          <CardFooter className="h-12 pb-0 border-t">
            <Skeleton className="h-2 w-3/5" />
          </CardFooter>
        </Card>
      </li>
      <li className="col-span-3 lg:col-span-4">
        <Card className="h-80 flex flex-col">
          <CardHeader className="p-0">
            <div className="bg-zinc-100 dark:bg-zinc-900 h-32 flex items-center justify-center rounded-t-lg border-b">
              <Skeleton className="h-8 w-2/5 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="flex-auto p-6">
            <Skeleton className="h-4 w-2/5" />
          </CardContent>
          <CardFooter className="h-12 pb-0 border-t">
            <Skeleton className="h-2 w-3/5" />
          </CardFooter>
        </Card>
      </li>
      <li className="col-span-3 lg:col-span-4">
        <Card className="h-80 flex flex-col">
          <CardHeader className="p-0">
            <div className="bg-zinc-100 dark:bg-zinc-900 h-32 flex items-center justify-center rounded-t-lg border-b">
              <Skeleton className="h-8 w-2/5 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent className="flex-auto p-6">
            <Skeleton className="h-4 w-2/5" />
          </CardContent>
          <CardFooter className="h-12 pb-0 border-t">
            <Skeleton className="h-2 w-3/5" />
          </CardFooter>
        </Card>
      </li>
    </ul>
  );
}
