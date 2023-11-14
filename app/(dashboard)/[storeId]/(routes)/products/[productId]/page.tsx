import { getCategories } from '@/lib/api/categories';
import { getColors } from '@/lib/api/colors';
import { getProductById } from '@/lib/api/products';
import { getSizes } from '@/lib/api/sizes';

import { ProductForm } from './components/product-form';

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product = await getProductById(params.productId);
  const categories = await getCategories(params.storeId);
  const sizes = await getSizes(params.storeId);
  const colors = await getColors(params.storeId);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 pr-0">
      <ProductForm
        initialData={product}
        categories={categories}
        sizes={sizes}
        colors={colors}
      />
    </div>
  );
}
