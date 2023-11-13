'use client';

import { useParams, usePathname } from 'next/navigation';
import {
  BarChart2,
  Expand,
  Palette,
  Presentation,
  Settings,
  Shapes,
  ShoppingBag,
  ShoppingBasket,
} from 'lucide-react';
import { Link } from 'nextjs13-progress';

import { cn } from '@/lib/utils';

export function Sidebar() {
  const params = useParams();
  const pathname = usePathname();

  const navRoute = [
    {
      label: 'Overview',
      children: [
        {
          href: `/${params.storeId}`,
          label: 'Dashboard',
          active: pathname === `/${params.storeId}`,
          icon: <BarChart2 className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: 'Configure',
      children: [
        {
          href: `/${params.storeId}/categories`,
          label: 'Categories',
          active:
            pathname === `/${params.storeId}/categories` ||
            pathname === `/${params.storeId}/categories/${params.categoryId}`,
          icon: <Shapes className="w-4 h-4 mr-2" />,
        },
        {
          href: `/${params.storeId}/sizes`,
          label: 'Sizes',
          active:
            pathname === `/${params.storeId}/sizes` ||
            pathname === `/${params.storeId}/sizes/${params.sizeId}`,
          icon: <Expand className="w-4 h-4 mr-2" />,
        },
        {
          href: `/${params.storeId}/colors`,
          label: 'Colors',
          active:
            pathname === `/${params.storeId}/colors` ||
            pathname === `/${params.storeId}/colors/${params.colorId}`,
          icon: <Palette className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: 'Products',
      children: [
        {
          href: `/${params.storeId}/products`,
          label: 'Products',
          active:
            pathname === `/${params.storeId}/products` ||
            pathname === `/${params.storeId}/products/${params.productId}`,
          icon: <ShoppingBasket className="w-4 h-4 mr-2" />,
        },
        {
          href: `/${params.storeId}/orders`,
          label: 'Orders',
          active: pathname === `/${params.storeId}/orders`,
          icon: <ShoppingBag className="w-4 h-4 mr-2" />,
        },
        {
          href: `/${params.storeId}/billboards`,
          label: 'Billboards',
          active:
            pathname === `/${params.storeId}/billboards` ||
            pathname === `/${params.storeId}/billboards/${params.billboardId}`,
          icon: <Presentation className="w-4 h-4 mr-2" />,
        },
      ],
    },
    {
      label: 'Store',
      children: [
        {
          href: `/${params.storeId}/settings`,
          label: 'Settings',
          active: pathname === `/${params.storeId}/settings`,
          icon: <Settings className="w-4 h-4 mr-2" />,
        },
      ],
    },
  ];

  return (
    <div className="tracking-wide">
      <ul className="flex flex-col space-y-4">
        {navRoute.map((route) => (
          <li key={route.label}>
            <strong className="block text-xs font-medium text-zinc-800 dark:text-zinc-300 tracking-wide">
              {route.label}
            </strong>

            <ul className="mt-2 space-y-1">
              {route.children.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className={cn(
                      'flex items-center rounded-lg px-4 py-2 text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors',
                      r.active
                        ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white'
                        : ''
                    )}
                  >
                    {r.icon && r.icon}
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
