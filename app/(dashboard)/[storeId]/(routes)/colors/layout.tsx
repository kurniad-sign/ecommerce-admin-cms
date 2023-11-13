import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colors - Crown',
};

export default function ColorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
