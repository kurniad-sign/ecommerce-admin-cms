import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sizes - Crown',
};

export default function SizesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
