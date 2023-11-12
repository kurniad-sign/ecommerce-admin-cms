import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billboards - Crown',
};

export default function BillboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
