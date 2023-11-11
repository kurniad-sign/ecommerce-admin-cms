import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { getStores } from '@/lib/api/stores';

export const metadata: Metadata = {
  title: 'Crown - Create your first store',
};

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await getStores();

  if (stores.length) {
    redirect(`/stores`);
  }

  return <>{children}</>;
}
