'use server';

import { db } from '@/db';
import { categories } from '@/db/schema';
import { unstable_cache } from '@/lib/unstable-cache';
import { asc, eq } from 'drizzle-orm';

export const getCategories = unstable_cache(
  async () => {
    return await db.query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: [asc(categories.name)],
    });
  },
  ['categories'],
  { revalidate: 60 * 60 * 24 } // 24 hours
);

export const getCategoryById = unstable_cache(
  async (id: string) => {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  },
  ['category'],
  { revalidate: 60 * 60 * 24 } // 24 hours
);
