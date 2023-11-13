import prismadb from '../db';

export async function getOrders(storeId: string) {
  try {
    const orders = await prismadb.order.findMany({
      where: {
        storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return orders;
  } catch (error) {
    throw new Error('Error when fetch orders.');
  }
}
