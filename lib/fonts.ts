import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const generalSans = localFont({
  src: '../public/GeneralSans.ttf',
  display: 'swap',
  variable: '--font-general-sans',
});

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
