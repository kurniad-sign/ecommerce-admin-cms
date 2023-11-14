import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up - Crown',
  description: 'Register Crown admin store account.',
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
