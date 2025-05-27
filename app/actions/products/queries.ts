'use server';

import { db } from '@/db';
import { unstable_cache } from '@/lib/unstable-cache';

export const getProducts = unstable_cache(
  async () => {
    const products = await db.query.products.findMany({
      with: {
        category: true,
        productImages: {
          with: {
            image: true,
          },
        },
        productIngredients: {
          with: {
            ingredient: true,
          },
        },
      },
    });
    return products;
  },
  ['products'],
  {
    revalidate: 60 * 60 * 24, // 24 hours
  }
);
