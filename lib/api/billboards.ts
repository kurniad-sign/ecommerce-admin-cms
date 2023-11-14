import prismadb from '../db';

export async function getBillboards(storeId: string) {
  try {
    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return billboards;
  } catch (error) {
    throw new Error('Error when fetch billboards');
  }
}

export async function getBillboardById(billboardId: string) {
  try {
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });

    return billboard;
  } catch (error) {
    throw new Error('Error when fetch billboard');
  }
}
