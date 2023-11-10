import './globals.css';

import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Next13NProgress } from 'nextjs13-progress';

import { ModalProvider } from '@/components/providers/modal-providers';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-providers';
import { generalSans, inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang="en"
        suppressHydrationWarning
        className={cn(generalSans.variable, inter.variable)}
      >
        <body className="min-h-screen w-full flex flex-col overflow-x-hidden">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModalProvider />
            <Next13NProgress color="#71717a" />
            <ToastProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
