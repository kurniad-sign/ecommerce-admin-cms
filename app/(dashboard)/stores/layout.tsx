import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { getStores } from '@/lib/api/stores';

export const metadata: Metadata = {
  title: 'Crown - Stores',
};

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stores = await getStores();

  if (!stores.length) redirect('/');

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
