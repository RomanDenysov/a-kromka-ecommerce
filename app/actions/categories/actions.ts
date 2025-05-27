'use server';

import { db } from '@/db';
import { type InsertCategory, categories } from '@/db/schema';
import { revalidateTag } from 'next/cache';

export async function createCategory(data: InsertCategory) {
  try {
    await db.insert(categories).values(data);

    revalidateTag('categories');
    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
    return { success: false, error: 'Failed to create category' };
  }
}
