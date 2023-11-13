import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories - Crown',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
