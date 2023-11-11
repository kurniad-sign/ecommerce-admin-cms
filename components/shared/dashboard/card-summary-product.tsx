import { CreditCard, DollarSign } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSalesCount } from '@/lib/api/get-sales-count';
import { getStockCount } from '@/lib/api/get-stock-count';
import { getTotalRevenue } from '@/lib/api/get-total-revenue';
import { priceFormatter } from '@/lib/utils';

export async function CardSummaryProduct({ storeId }: { storeId: string }) {
  const totalRevenueData = await getTotalRevenue(storeId);
  const salesCountData = await getSalesCount(storeId);
  const stockCountData = await getStockCount(storeId);

  const [totalRevenue, salesCount, stockCount] = await Promise.all([
    totalRevenueData,
    salesCountData,
    stockCountData,
  ]);

  return (
    <div className="grid gap-4 grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-general-sans font-semibold">
            {priceFormatter.format(totalRevenue)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Sales
          </CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-general-sans font-semibold">
            +{salesCount}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground font-medium">
            Product in Stock
          </CardTitle>
          <CreditCard className="h-4 w-4 font-general-sans text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stockCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}
