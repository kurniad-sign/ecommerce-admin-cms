'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  formCategorySchema,
  FormCategorySchemaType,
} from '@/lib/form-schema/category-schema';

interface CategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const actions = useMemo(() => {
    return {
      buttonAction: !initialData ? 'Save' : 'Save Changes',
      title: !initialData ? 'Create Category' : 'Edit Category',
      description: !initialData ? 'Add a new category' : 'Edit a category',
      toastError: `Error when ${
        !initialData ? 'creating' : 'updating'
      } category`,
      toastSuccess: `Category ${!initialData ? 'created' : 'updated'}`,
    };
  }, [initialData]);

  const form = useForm<FormCategorySchemaType>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: initialData || {
      billboardId: '',
      name: '',
    },
  });

  const onSubmit = async (data: FormCategorySchemaType) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }
    } catch (error) {
      console.error(error);
      toast.error(actions.toastError);
    } finally {
      setLoading(false);
      router.push(`/${params.storeId}/categories`);
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
                    placeholder="Category name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billboardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select
                  disabled={loading}
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        defaultValue={field.value}
                        placeholder="Select a billboard"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboards.map((billboard) => (
                      <SelectItem key={billboard.id} value={billboard.id}>
                        {billboard.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
