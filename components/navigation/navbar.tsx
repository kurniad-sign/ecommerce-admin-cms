'use client';

import { useParams } from 'next/navigation';
import { useStore } from '@/hooks/api/use-store';
import { UserButton } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'nextjs13-progress';

import { LogoDark } from '../icon/logo-dark';
import { LogoLight } from '../icon/logo-white';
import StoreSwitcher from '../store-switcher';
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  const { theme } = useTheme();
  const { stores, isLoading } = useStore();
  const params = useParams();

  return (
    <header className="border-b relative h-16">
      <nav className="h-full flex items-center container mx-auto gap-x-8">
        <div className="flex items-center leading-none">
          <Link href="/">
            {theme === 'light' ? <LogoLight /> : <LogoDark />}
          </Link>
        </div>

        {!params.storeId ? null : isLoading ? (
          <div className="border rounded-md w-[200px] h-9 flex items-center justify-between px-3">
            <span className="text-sm">Loading...</span>
            <Loader2 className="w-[14px] h-[14px] animate-spin" />
          </div>
        ) : (
          <StoreSwitcher items={stores} />
        )}

        <div className="ml-auto flex items-center ">
          <ThemeToggle />
          <div>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>
    </header>
  );
}
