import { createCategory } from '@/app/actions/categories/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  isActive: z.boolean(),
  sortOrder: z.number().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export function useCreateCategoryForm() {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      isActive: true,
      sortOrder: 0,
    },
  });

  const handleFormSubmit = async (values: CategoryFormValues) => {
    const result = await createCategory(values);
    if (result.success) {
      form.reset();
      toast.success('Category created successfully');
    } else {
      toast.error(result.error ?? 'Failed to create category');
    }
  };

  const isLoading = form.formState.isSubmitting;

  return { form, onSubmit: handleFormSubmit, isLoading };
}
