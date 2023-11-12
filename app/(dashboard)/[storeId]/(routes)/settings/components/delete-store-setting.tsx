'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Store } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import { Loader2, Trash } from 'lucide-react';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';

export function DeleteStoreSettings({ store }: { store: Store }) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
    } catch (error) {
      console.error(error);
      toast.error('Make sure you removed all products and categories first');
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
      router.push('/');
      toast.success('Successfully deleted store');
    }
  };

  return (
    <>
      <Modal
        title="Are you sure ?"
        description="The store will be permanently deleted, including all the products
              you created, This action is irreversible."
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={loading} variant="destructive" onClick={onDelete}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </div>
      </Modal>
      <Card>
        <CardContent className="pt-6 flex gap-6">
          <div className="flex-grow basis-1/2 space-y-1">
            <h3 className="font-semibold text-rose-600 dark:text-rose-500">
              Delete Store
            </h3>
            <p className="text-sm text-muted-foreground">
              The store will be permanently deleted, including all the products
              you created, This action is irreversible.
            </p>
          </div>
          <div className="flex-grow basis-1/2 space-y-1">
            <div className="flex flex-col rounded-lg  px-8 py-6 border">
              <div className="text-sm font-semibold mb-0.5">{store.name}</div>
              <div className="text-sm text-muted-foreground">
                Last update: {format(store.updatedAt, 'dd-MMM-yyyy, HH:mm')}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 px-6 border-t flex justify-end">
          <Button variant={'destructive'} onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Delete Storé
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
