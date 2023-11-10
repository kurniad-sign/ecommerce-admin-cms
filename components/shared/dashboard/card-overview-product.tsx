import { Overview } from '@/components/overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGraphRevenue } from '@/lib/api/get-graph-revenue';

export async function CardOverviewProduct({ storeId }: { storeId: string }) {
  const graphRevenue = await getGraphRevenue(storeId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-general-sans tracking-normal">
          Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview data={graphRevenue} />
      </CardContent>
    </Card>
  );
}
