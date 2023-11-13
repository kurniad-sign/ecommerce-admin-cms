'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
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
  formColorSchema,
  FormColorSchemaType,
} from '@/lib/form-schema/color-schema';

interface ColorFormProps {
  initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const actions = useMemo(() => {
    return {
      buttonAction: !initialData ? 'Save' : 'Save Changes',
      title: !initialData ? 'Create Colors' : 'Edit Colors',
      description: !initialData ? 'Add a new colors' : 'Edit a colors',
      toastError: `Error when ${!initialData ? 'creating' : 'updating'} colors`,
      toastSuccess: `Colors ${!initialData ? 'created' : 'updated'}`,
    };
  }, [initialData]);

  const form = useForm<FormColorSchemaType>({
    resolver: zodResolver(formColorSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: FormColorSchemaType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }
    } catch (error) {
      console.error(error);
      toast.error(actions.toastError);
    } finally {
      setLoading(false);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success(actions.toastSuccess);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Heading
                title={actions.title}
                description={actions.description}
              />
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
                      placeholder="Color name"
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
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
