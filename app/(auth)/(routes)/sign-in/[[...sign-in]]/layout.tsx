import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in - Crown',
  description: 'Sign in to Crown admin store account.',
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
