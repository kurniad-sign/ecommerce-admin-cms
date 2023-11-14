import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { getStores } from '@/lib/api/stores';

export const metadata: Metadata = {
  title: 'Create first store - Crown',
};

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  const stores = await getStores();

  if (stores.length) {
    redirect(`/stores`);
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
