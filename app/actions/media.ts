'use server';

import { db } from '@/db';
import { media } from '@/db/schema';
import { createId } from '@paralleldrive/cuid2';
import { put } from '@vercel/blob';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import sharp from 'sharp';

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1920;
const QUALITY = 85;
const FILE_EXTENSION_REGEX = /\.[^/.]+$/;

type UploadResult = {
  success: boolean;
  media?: typeof media.$inferSelect;
  error?: string;
};

export async function uploadMedia(formData: FormData): Promise<UploadResult> {
  try {
    const imageFile = formData.get('image') as File;
    const alt = formData.get('alt') as string;
    const caption = formData.get('caption') as string;

    if (!imageFile) {
      return { success: false, error: 'No image file provided' };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(imageFile.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.',
      };
    }

    // Validate file size (4.5MB limit)
    if (imageFile.size > 4.5 * 1024 * 1024) {
      return { success: false, error: 'File size exceeds 4.5MB limit' };
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const buffer = Buffer.from(new Uint8Array(arrayBuffer)) as any;
    const metadata = await sharp(buffer).metadata();

    let optimizedBuffer = buffer;
    let contentType = imageFile.type;
    let finalFilename = imageFile.name;

    // Optimize image if possible
    if (metadata.format) {
      optimizedBuffer = await sharp(buffer)
        .resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({
          quality: QUALITY,
          effort: 4,
        })
        .toBuffer();

      contentType = 'image/webp';
      finalFilename = `${imageFile.name.replace(FILE_EXTENSION_REGEX, '')}.webp`;
    }

    // Upload to Vercel Blob
    const blob = await put(finalFilename, optimizedBuffer, {
      access: 'public',
      contentType,
      addRandomSuffix: true,
    });

    // Extract blob ID from URL for management purposes
    const blobId = blob.pathname || blob.url.split('/').pop() || '';

    // Save to database
    const mediaId = createId();
    const [savedMedia] = await db
      .insert(media)
      .values({
        id: mediaId,
        filename: finalFilename,
        originalName: imageFile.name,
        mimeType: contentType,
        size: optimizedBuffer.length.toString(),
        url: blob.url,
        blobId: blobId,
        alt: alt || null,
        caption: caption || null,
      })
      .returning();

    revalidatePath('/admin/media');

    return { success: true, media: savedMedia };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload image',
    };
  }
}

export async function getMedia(page = 1, limit = 20) {
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
}

export async function getMediaById(id: string) {
  const mediaItem = await db.query.media.findFirst({
    where: eq(media.id, id),
  });
  return mediaItem;
}

export async function updateMedia(
  id: string,
  data: { alt?: string; caption?: string; filename?: string }
): Promise<{ success: boolean; error?: string }> {
  try {
    await db
      .update(media)
      .set({
        alt: data.alt || null,
        caption: data.caption || null,
        filename: data.filename,
        updatedAt: new Date(),
      })
      .where(eq(media.id, id));

    revalidatePath('/admin/media');
    revalidatePath(`/admin/media/${id}`);

    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Update media error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update media',
    };
  }
}

export async function deleteMedia(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get media info first for blob cleanup
    const mediaItem = await db.query.media.findFirst({
      where: eq(media.id, id),
    });

    if (!mediaItem) {
      return { success: false, error: 'Media not found' };
    }

    // Delete from database
    await db.delete(media).where(eq(media.id, id));

    // TODO: Consider deleting from Vercel Blob as well
    // This would require importing and using the del function from @vercel/blob

    revalidatePath('/admin/media');

    return { success: true };
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error('Delete media error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete media',
    };
  }
}
