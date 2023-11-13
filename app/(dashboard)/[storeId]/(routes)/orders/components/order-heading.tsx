'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export function OrderHeading() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Orders`} description="Manage orders for your store" />
      </div>
      <Separator />
    </>
  );
}
