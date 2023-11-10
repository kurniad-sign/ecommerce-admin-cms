import { Metadata } from 'next';

import { Footer } from '@/components/navigation/footer';
import { Navbar } from '@/components/navigation/navbar';

export const metadata: Metadata = {
  title: 'Crown - Stores',
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
