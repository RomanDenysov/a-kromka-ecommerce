import { createProduct } from '@/app/actions/products/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required'),
  categoryId: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  imageIds: z.array(z.string()).optional(),
  ingredientIds: z.array(z.string()).optional(),
  priceEuros: z.string().min(1, 'Price is required'),
  priceEurosInternal: z.string().optional(),
  status: z.enum(['draft', 'active', 'sold', 'archived']),
  inventory: z.number().nullable().optional(),
  sortOrder: z.number().min(0),
  sellingZone: z.enum(['b2b', 'b2c', 'b2b_b2c']),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export function useCreateProductForm() {
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      slug: '',
      categoryId: '',
      description: '',
      imageIds: [],
      ingredientIds: [],
      priceEuros: '0.00',
      priceEurosInternal: '0.00',
      status: 'draft',
      inventory: null,
      sortOrder: 0,
      sellingZone: 'b2c',
      isActive: true,
      isFeatured: false,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      // Convert string prices to numbers
      const priceEuros = Number.parseFloat(values.priceEuros || '0');
      const priceEurosInternal = values.priceEurosInternal
        ? Number.parseFloat(values.priceEurosInternal)
        : undefined;

      const result = await createProduct({
        name: values.name,
        slug: values.slug,
        categoryId: values.categoryId,
        description: values.description || undefined,
        primaryImageId: values.imageIds?.[0] || undefined,
        imageIds: values.imageIds?.length ? values.imageIds : undefined,
        ingredientIds: values.ingredientIds?.length
          ? values.ingredientIds
          : undefined,
        priceCents: Math.round(priceEuros * 100), // Convert euros to cents
        priceCentsInternal: priceEurosInternal
          ? Math.round(priceEurosInternal * 100)
          : undefined,
        status: values.status,
        inventory: values.inventory || undefined,
        sortOrder: values.sortOrder,
        sellingZone: values.sellingZone,
        isActive: values.isActive,
        isFeatured: values.isFeatured,
      });

      if (result.success) {
        form.reset();
        toast.success('Product created successfully');

        router.push(`/admin/products/${result.product?.id}`);
      } else {
        toast.error(result.error || 'Failed to create product');
      }
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Form submission error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      router.refresh();
    }
  });

  const isLoading = form.formState.isSubmitting;

  return {
    form,
    onSubmit,
    isLoading,
  };
}
