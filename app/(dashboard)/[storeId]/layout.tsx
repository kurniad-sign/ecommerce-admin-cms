import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';
import { Sidebar } from '@/components/navigation/sidebar';
import prismadb from '@/lib/db';

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

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

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
          <div className="p-8 pb-0 pr-0">
            <Footer />
          </div>
        </section>
      </main>
    </>
  );
}
