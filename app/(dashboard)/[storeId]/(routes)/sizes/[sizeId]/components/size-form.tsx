'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Size } from '@prisma/client';
import axios from 'axios';
import { Loader2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  formSizeSchema,
  FormSizeSchemaType,
} from '@/lib/form-schema/size-schema';

interface SizeFormProps {
  initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const actions = useMemo(() => {
    return {
      buttonAction: !initialData ? 'Save' : 'Save Changes',
      title: !initialData ? 'Create Sizes' : 'Edit Sizes',
      description: !initialData ? 'Add a new sizes' : 'Edit a sizes',
      toastError: `Error when ${!initialData ? 'creating' : 'updating'} sizes`,
      toastSuccess: `Sizes ${!initialData ? 'created' : 'updated'}`,
    };
  }, [initialData]);

  const form = useForm<FormSizeSchemaType>({
    resolver: zodResolver(formSizeSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: FormSizeSchemaType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/sizes`, data);
      }
    } catch (error) {
      console.error(error);
      toast.error(actions.toastError);
    } finally {
      setLoading(false);
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
      toast.success(actions.toastSuccess);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Heading title={actions.title} description={actions.description} />
            <Button disabled={loading} className="ml-auto" type="submit">
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {actions.buttonAction}
            </Button>
          </div>
          <Separator />
        </div>

        <div className="pt-8 grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Size name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Size value"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
