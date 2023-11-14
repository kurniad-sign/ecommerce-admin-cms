import prismadb from '../db';

export async function getColors(storeId: string) {
  try {
    const colors = await prismadb.color.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return colors;
  } catch (error) {
    throw new Error('Error when fetch colors.');
  }
}

export async function getColorById(id: string) {
  try {
    const color = await prismadb.color.findUnique({
      where: {
        id,
      },
    });

    return color;
  } catch (error) {
    throw new Error('Error when fetch color.');
  }
}
