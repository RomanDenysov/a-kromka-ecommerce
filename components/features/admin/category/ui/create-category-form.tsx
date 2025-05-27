import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { getSlug } from '@/lib/get-slug';
import type { UseFormReturn } from 'react-hook-form';
import type { CategoryFormValues } from '../hook/use-create-category-form';

interface CreateCategoryFormProps {
  form: UseFormReturn<CategoryFormValues>;
  onSubmit: (values: CategoryFormValues) => Promise<void>;
}

export function CreateCategoryForm({
  form,
  onSubmit,
}: CreateCategoryFormProps) {
  return (
    <Form {...form}>
      <form
        id="create-category-form"
        name="create-category-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-4 py-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onBlur={(e) => {
                    e.preventDefault();
                    const value = e.target.value;
                    form.setValue('slug', getSlug(value));
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    e.preventDefault();
                    const value = getSlug(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Category</FormLabel>
                <FormDescription>
                  Show this category in the store
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sortOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sort Order</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
