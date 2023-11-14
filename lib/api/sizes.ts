import prismadb from '../db';

export async function getSizes(storeId: string) {
  try {
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return sizes;
  } catch (error) {
    throw new Error('Error when fetch sizes');
  }
}

export async function getSizeById(id: string) {
  try {
    const size = await prismadb.size.findUnique({
      where: {
        id,
      },
    });

    return size;
  } catch (error) {
    throw new Error('Error when fetch size');
  }
}
