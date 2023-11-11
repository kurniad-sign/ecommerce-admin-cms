import { Loader2 } from 'lucide-react';

import { Card, CardContent } from '../ui/card';

export function CardOverviewSkeleton() {
  return (
    <Card className="h-[450px]">
      <CardContent className="h-full flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin repeat-infinite" />
      </CardContent>
    </Card>
  );
}
