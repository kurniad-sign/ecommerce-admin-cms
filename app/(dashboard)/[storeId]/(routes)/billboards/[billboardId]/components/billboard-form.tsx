'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
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
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  formBillboardSchema,
  FormBillboardSchemaType,
} from '@/lib/form-schema/billboard-schema';

interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const actions = useMemo(() => {
    return {
      buttonAction: !initialData ? 'Save' : 'Save Changes',
      title: !initialData ? 'Create Billboard' : 'Edit Billboard',
      description: !initialData ? 'Add a new billboard' : 'Edit a billboard',
      toastError: `Error when ${
        !initialData ? 'creating' : 'updating'
      } billboard`,
      toastSuccess: `Billboard ${!initialData ? 'created' : 'updated'}`,
    };
  }, [initialData]);

  const form = useForm<FormBillboardSchemaType>({
    resolver: zodResolver(formBillboardSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: FormBillboardSchemaType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }
    } catch (error) {
      console.error(error);
      toast.error(actions.toastError);
    } finally {
      setLoading(false);
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
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

        <div className="space-y-8 pt-8">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Image</FormLabel>
                <FormControl>
                  <ImageUpload
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
