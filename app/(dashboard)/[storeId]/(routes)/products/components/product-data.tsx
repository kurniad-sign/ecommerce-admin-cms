import { format } from 'date-fns';

import { DataTable } from '@/components/ui/data-table';
import { getProducts } from '@/lib/api/products';
import { priceFormatter } from '@/lib/utils';

import { columns, ProductColumn } from './columns';

export async function ProductData({ storeId }: { storeId: string }) {
  const products = await getProducts(storeId);

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: priceFormatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <DataTable columns={columns} data={formattedProducts} searchKey="name" />
  );
}
