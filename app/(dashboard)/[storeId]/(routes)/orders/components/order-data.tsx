import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getOrders } from '@/lib/api/orders';
import { priceFormatter } from '@/lib/utils';

import { columns, OrderColumn } from './columns';

export async function OrderData({ storeId }: { storeId: string }) {
  const orders = await getOrders(storeId);

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((order) => order.product.name).join(', '),
    totalPrice: priceFormatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <DataTable columns={columns} data={formattedOrders} searchKey="products" />
  );
}
