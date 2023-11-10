'use client';

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';

import { LogoDark } from '../icon/logo-dark';
import { LogoLight } from '../icon/logo-white';
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="border-b relative h-16">
      <nav className="h-full flex items-center container mx-auto">
        <div className="h-full flex items-center leading-none">
          <Link href="/">
            {theme === 'light' ? <LogoLight /> : <LogoDark />}
          </Link>
        </div>
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
