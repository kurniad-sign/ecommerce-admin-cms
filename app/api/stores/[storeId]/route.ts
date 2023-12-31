import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/db';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated Account', { status: 401 });
    }

    const body = await req.json();
    const { name, store_id, store_logo_url } = body;

    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is Required', { status: 400 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
        store_id,
        store_logo_url,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORE_PATCH] ${error}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthenticated Account', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is Required', { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error(`[STORE_DELETE] ${error}`);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
