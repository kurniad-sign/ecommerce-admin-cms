import prismadb from '../db';

export async function getCategories(storeId: string) {
  try {
    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return categories;
  } catch (error) {
    throw new Error('Error when fetch categories');
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prismadb.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  } catch (error) {
    throw new Error('Error when fetch category');
  }
}
