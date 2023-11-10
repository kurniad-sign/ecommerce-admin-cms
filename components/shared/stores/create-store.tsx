'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function CreateStore() {
  const { onOpen } = useStoreModal();

  return (
    <Button onClick={onOpen}>
      <Plus className="mr-2 w-4 h-4" /> Create Store
    </Button>
  );
}
