'use server';

import { db } from '@/db';
import { media } from '@/db/schema';
import { unstable_cache } from '@/lib/unstable-cache';
import { desc, eq } from 'drizzle-orm';

export const getMedia = unstable_cache(
  async (page: number, limit: number) => {
    try {
      const offset = (page - 1) * limit;

      const mediaItems = await db
        .select()
        .from(media)
        .orderBy(desc(media.createdAt))
        .limit(limit)
        .offset(offset);

      return mediaItems;
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Fetch media error:', error);
      return [];
    }
  },
  ['images'],
  {
    revalidate: 60 * 60 * 24, // 24 hours
  }
);

export const getMediaById = unstable_cache(
  async (id: string) => {
    const mediaItem = await db.query.media.findFirst({
      where: eq(media.id, id),
    });
    return mediaItem;
  },
  ['image'],
  {
    revalidate: 60 * 60 * 24, // 24 hours
  }
);
