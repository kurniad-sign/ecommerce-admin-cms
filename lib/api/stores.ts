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

export async function getStoreById(id: string) {
  const { userId } = auth();

  try {
    const store = await prismadb.store.findFirst({
      where: {
        id,
        userId: userId as string,
      },
    });
    return store;
  } catch (error) {
    console.error(error);
    throw new Error('Error when fetch Store');
  }
}
