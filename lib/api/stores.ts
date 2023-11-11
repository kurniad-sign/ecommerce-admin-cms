import { auth } from '@clerk/nextjs';

import prismadb from '../db';

export async function getStores() {
  const { userId } = auth();

  try {
    const stores = await prismadb.store.findMany({
      where: {
        userId: userId as string,
      },
    });

    return stores;
  } catch (error) {
    console.error(error);
    throw new Error('Error when fetch Stores');
  }
}
