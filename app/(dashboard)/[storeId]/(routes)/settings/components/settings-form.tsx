'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import {
  formStoreSchema,
  FormStoreSchemaType,
} from '@/lib/form-schema/store-schema';

interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultData = useMemo(() => {
    return {
      name: initialData.name,
      store_id: initialData.store_id as string,
      store_logo_url: initialData.store_logo_url as string,
    };
  }, [initialData]);

  const form = useForm<FormStoreSchemaType>({
    resolver: zodResolver(formStoreSchema),
    defaultValues: defaultData || {},
  });

  const onSubmit = async (data: FormStoreSchemaType) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
    } catch (error) {
      console.error(error);
      toast.error('Error when updating store');
    } finally {
      setLoading(false);
      router.refresh();
      toast.success('Succesfully update store.');
    }
  };

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 h-full"
        >
          <CardContent className="pt-6">
            <div className="flex gap-6">
              <div className="flex-grow basis-1/2 space-y-1">
                <h3 className="text-xl font-general-sans font-medium">
                  General
                </h3>
                <p className="text-sm text-muted-foreground">
                  Change your store name, add logo to your own store
                </p>
              </div>
              <div className="flex-grow basis-1/2 flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Store Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="store_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store ID</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Your store id"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="store_logo_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Logo</FormLabel>
                      <FormControl>
                        <ImageUpload
                          height={100}
                          width={100}
                          value={field.value ? [field.value] : []}
                          disabled={loading}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange('')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 px-6 border-t">
            <Button
              disabled={loading}
              variant={'outline'}
              className="ml-auto"
              type="submit"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
