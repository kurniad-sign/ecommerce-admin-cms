import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized access', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORE_POST] ${error}`);

    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const stores = await prismadb.store.findMany({
      where: {
        userId,
      },
    });

    return NextResponse.json(stores);
  } catch (error) {
    console.error('[GET_STORES] error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
