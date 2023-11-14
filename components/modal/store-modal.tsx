'use client';

import { useState } from 'react';
import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Info, Loader2, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import {
  formStoreSchema,
  FormStoreSchemaType,
} from '@/lib/form-schema/store-schema';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

export const StoreModal = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<FormStoreSchemaType>({
    resolver: zodResolver(formStoreSchema),
  });

  const onSubmit = async (values: FormStoreSchemaType) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      console.error(error);
      toast.error('Something wrong when creating store');
    } finally {
      setLoading(false);
      toast.success('Store created');
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add new store to manage products and categories"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        handleClose();
        form.reset({});
      }}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {open ? (
                <Card>
                  <CardHeader className="relative">
                    <CardTitle className="text-xl font-general-sans leading-none">
                      Store ID
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Enter your custom store id, leave blank for randomly
                      generated one
                    </CardDescription>
                    <Button
                      className="absolute -top-5 -right-5 cursor-pointer rounded-full"
                      size={'icon'}
                      variant={'outline'}
                      disabled={loading}
                      onClick={() => {
                        handleClose();
                        form.resetField('store_id');
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        name="store_id"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Your store id"
                                disabled={loading}
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="flex items-center">
                              <Info size={14} className="mr-1" />
                              Allowed characters: lowercase alphanumeric and
                              non-leading hyphen
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Button
                  size={'sm'}
                  variant={'outline'}
                  className="text-xs"
                  onClick={handleOpen}
                  disabled={loading}
                >
                  <Plus className="mr-2 w-3 h-3" />
                  Store ID
                </Button>
              )}

              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={() => {
                    onClose();
                    handleClose();
                    form.reset({});
                  }}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Store
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
