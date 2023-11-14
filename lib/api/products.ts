import prismadb from '../db';

export async function getProducts(storeId: string) {
  try {
    const products = await prismadb.product.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        size: true,
        color: true,
      },
    });

    return products;
  } catch (error) {
    throw new Error('Error when fetch products');
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    return product;
  } catch (error) {
    throw new Error('Error when fetch product.');
  }
}
