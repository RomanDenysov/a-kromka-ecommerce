'use server';

import { db } from '@/db';
import {
  type InsertProduct,
  productImages,
  productIngredients,
  products,
} from '@/db/schema';
import { getSlug } from '@/lib/get-slug';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

type CreateProductInput = {
  // Basic product info
  name: string;
  slug?: string; // Optional, will be generated from name if not provided
  description?: string;
  categoryId: string;

  // Pricing (in cents)
  priceCents: number;
  priceCentsInternal?: number;

  // Product settings
  status?: 'draft' | 'active' | 'sold' | 'archived';
  inventory?: number;
  sortOrder?: number;
  sellingZone?: 'b2b' | 'b2c' | 'b2b_b2c';
  isActive?: boolean;
  isFeatured?: boolean;

  // Images
  primaryImageId?: string;
  imageIds?: string[]; // Additional images with order

  // Ingredients
  ingredientIds?: string[]; // Ingredients with order
};

type CreateProductResult = {
  success: boolean;
  product?: typeof products.$inferSelect;
  error?: string;
};

export async function createProduct(
  input: CreateProductInput
): Promise<CreateProductResult> {
  try {
    const productData: InsertProduct = {
      name: input.name,
      slug: input.slug || getSlug(input.name),
      description: input.description || null,
      categoryId: input.categoryId,
      primaryImageId: input.primaryImageId || null,
      priceCents: input.priceCents,
      priceCentsInternal: input.priceCentsInternal || input.priceCents,
      status: input.status || 'draft',
      inventory: input.inventory || null,
      sortOrder: input.sortOrder || 0,
      sellingZone: input.sellingZone || 'b2c',
      isActive: input.isActive ?? true,
      isFeatured: input.isFeatured ?? false,
    };

    // Insert the main product first
    const [newProduct] = await db
      .insert(products)
      .values(productData)
      .returning();

    // Insert related images if provided
    if (input.imageIds?.length) {
      const productImageData = input.imageIds.map((imageId, index) => ({
        productId: newProduct.id,
        imageId,
        order: index,
      }));
      await db.insert(productImages).values(productImageData);
    }

    // Insert related ingredients if provided
    if (input.ingredientIds?.length) {
      const productIngredientData = input.ingredientIds.map(
        (ingredientId, index) => ({
          productId: newProduct.id,
          ingredientId,
          order: index,
        })
      );
      await db.insert(productIngredients).values(productIngredientData);
    }

    const result = newProduct;

    revalidatePath('/admin/products');
    revalidatePath('/admin/products/create');
    revalidatePath(`/admin/products/${result.id}`);

    return { success: true, product: result };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: 'Failed to create product. Please try again.',
    };
  }
}

// Helper function to create a product with simplified input
export async function createSimpleProduct(data: {
  name: string;
  categoryId: string;
  priceCents: number;
  description?: string;
}): Promise<CreateProductResult> {
  return await createProduct({
    name: data.name,
    categoryId: data.categoryId,
    priceCents: data.priceCents,
    description: data.description,
    status: 'draft',
    isActive: true,
    isFeatured: false,
  });
}

// Helper function to duplicate a product
export async function duplicateProduct(
  productId: string
): Promise<CreateProductResult> {
  try {
    const existingProduct = await db.query.products.findFirst({
      where: eq(products.id, productId),
      with: {
        productImages: {
          orderBy: (productImages, { asc }) => [asc(productImages.order)],
        },
        productIngredients: {
          orderBy: (productIngredients, { asc }) => [
            asc(productIngredients.order),
          ],
        },
      },
    });

    if (!existingProduct) {
      return { success: false, error: 'Product not found' };
    }

    // Create new product with "Copy of" prefix
    const newName = `Copy of ${existingProduct.name}`;

    return createProduct({
      name: newName,
      description: existingProduct.description || undefined,
      categoryId: existingProduct.categoryId,
      priceCents: existingProduct.priceCents,
      priceCentsInternal: existingProduct.priceCentsInternal,
      status: 'draft', // Always create copies as draft
      inventory: existingProduct.inventory || undefined,
      sortOrder: existingProduct.sortOrder,
      sellingZone: existingProduct.sellingZone,
      isActive: false, // Copies start as inactive
      isFeatured: false,
      primaryImageId: existingProduct.primaryImageId || undefined,
      imageIds: existingProduct.productImages.map((pi) => pi.imageId),
      ingredientIds: existingProduct.productIngredients.map(
        (pi) => pi.ingredientId
      ),
    });
  } catch (error) {
    console.error('Error duplicating product:', error);
    return {
      success: false,
      error: 'Failed to duplicate product. Please try again.',
    };
  }
}
