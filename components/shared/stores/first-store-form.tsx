'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Info, Loader2, Plus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  formStoreSchema,
  FormStoreSchemaType,
} from '@/lib/form-schema/store-schema';

export function FirstStoreForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const form = useForm<FormStoreSchemaType>({
    resolver: zodResolver(formStoreSchema),
  });

  async function handleSubmitStore(values: FormStoreSchemaType) {
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
  }

  return (
    <Card className="w-[640px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitStore)}>
          <CardHeader>
            <CardTitle className="text-3xl font-general-sans font-semibold">
              Create your first store
            </CardTitle>
            <CardDescription>
              Add new store to manage products and categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Store name"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
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
                        className="absolute top-5 right-5 cursor-pointer rounded-full"
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
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-x-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{' '}
              Create store
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
