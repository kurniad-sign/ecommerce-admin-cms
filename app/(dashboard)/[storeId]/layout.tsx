import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import { getStoreById } from '@/lib/api/stores';

export const metadata: Metadata = {
  title: 'Dashboard - Crown',
};

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await getStoreById(params.storeId);

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      <main className="flex-auto grid grid-cols-12 gap-8 container mx-auto">
        <aside className="col-span-3 xl:col-span-2 py-8">
          <Sidebar />
        </aside>
        <section className="col-span-9 xl:col-span-10 flex flex-col">
          {children}
          <div className="px-8">
            <Footer />
          </div>
        </section>
      </main>
    </>
  );
}
