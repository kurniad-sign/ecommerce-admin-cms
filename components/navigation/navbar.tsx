'use client';

import { useStore } from '@/hooks/api/use-store';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { Link } from 'nextjs13-progress';

import { LogoDark } from '../icon/logo-dark';
import { LogoLight } from '../icon/logo-white';
import StoreSwitcher from '../store-switcher';
import { ThemeToggle } from '../theme-toggle';
import { Skeleton } from '../ui/skeleton';

export function Navbar() {
  const { theme } = useTheme();
  const { stores, isLoading } = useStore();

  return (
    <header className="border-b relative h-16">
      <nav className="h-full flex items-center container mx-auto gap-x-8">
        <div className="flex items-center leading-none">
          <Link href="/">
            {theme === 'light' ? <LogoLight /> : <LogoDark />}
          </Link>
        </div>

        {isLoading ? (
          <Skeleton className="w-[200px] h-8 rounded-md" />
        ) : (
          <StoreSwitcher items={stores} />
        )}

        <div className="ml-auto flex items-center ">
          <ThemeToggle />
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </header>
  );
}
