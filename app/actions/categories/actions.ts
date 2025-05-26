'use server';

import { db } from '@/db';
import { type InsertCategory, categories } from '@/db/schema';

export async function createCategory(data: InsertCategory) {
  try {
    await db.insert(categories).values(data);

    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
    return { success: false, error: 'Failed to create category' };
  }
}
