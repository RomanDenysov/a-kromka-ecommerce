'use client';

import { uploadMedia } from '@/app/actions/media/actions';
import { Button } from '@/components/ui/button';
import { getCroppedImg } from '@/lib/crop-utils';
import { useCallback, useState, useTransition } from 'react';
import { DEFAULT_ACCEPT_TYPES, DEFAULT_MAX_SIZE } from './constants';
import { MediaUploadDropzone } from './dropzone';
import type { MediaUploadProps, UploadItem } from './types';
import { UploadItemCard } from './upload-item';

export function MediaUploadMulti({
  onUploadComplete,
  accept = DEFAULT_ACCEPT_TYPES,
  maxSize = DEFAULT_MAX_SIZE,
}: MediaUploadProps) {
  const [isPending, startTransition] = useTransition();
  const [uploadItems, setUploadItems] = useState<UploadItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const newItems: UploadItem[] = acceptedFiles.map((file) => {
      const id = Math.random().toString(36).substr(2, 9);
      const originalSrc = URL.createObjectURL(file);

      return {
        id,
        file,
        originalSrc,
        alt: '',
        caption: '',
        status: 'pending' as const,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspectRatio: 1, // Default to square
      };
    });

    setUploadItems((prev) => [...prev, ...newItems]);
    setError(null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  const updateItem = (id: string, updates: Partial<UploadItem>) => {
    setUploadItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const removeItem = (id: string) => {
    setUploadItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        URL.revokeObjectURL(item.originalSrc);
        if (item.croppedSrc) {
          URL.revokeObjectURL(item.croppedSrc);
        }
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const startCropping = (id: string) => {
    updateItem(id, { status: 'cropping' });
  };

  const confirmCrop = async (id: string) => {
    const item = uploadItems.find((i) => i.id === id);
    if (!item || !item.croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage = await getCroppedImg(
        item.originalSrc,
        item.croppedAreaPixels,
        item.file.name
      );

      const croppedSrc = URL.createObjectURL(croppedImage);
      updateItem(id, {
        croppedFile: croppedImage,
        croppedSrc,
        status: 'ready',
      });
    } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.error('Error cropping image:', error);
      updateItem(id, {
        status: 'error',
        error: 'Failed to crop image',
      });
    }
  };

  const cancelCrop = (id: string) => {
    updateItem(id, { status: 'pending' });
  };

  const uploadSingle = async (id: string) => {
    const item = uploadItems.find((i) => i.id === id);
    if (!item || (!item.croppedFile && !item.file)) {
      return;
    }

    updateItem(id, { status: 'uploading' });

    const formData = new FormData();
    formData.append('image', item.croppedFile || item.file);
    formData.append('alt', item.alt);
    formData.append('caption', item.caption);

    const result = await uploadMedia(formData);

    if (result.success && result.media) {
      updateItem(id, { status: 'uploaded' });
      onUploadComplete?.(result.media);
      // Remove after successful upload
      setTimeout(() => removeItem(id), 2000);
    } else {
      updateItem(id, {
        status: 'error',
        error: result.error || 'Upload failed',
      });
    }
  };

  const uploadAll = () => {
    const readyItems = uploadItems.filter((item) => item.status === 'ready');
    startTransition(async () => {
      for (const item of readyItems) {
        await uploadSingle(item.id);
      }
    });
  };

  const clearAll = () => {
    for (const item of uploadItems) {
      URL.revokeObjectURL(item.originalSrc);
      if (item.croppedSrc) {
        URL.revokeObjectURL(item.croppedSrc);
      }
    }
    setUploadItems([]);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">
          {error}
        </div>
      )}

      {/* Dropzone */}
      <MediaUploadDropzone
        onDrop={handleDrop}
        onError={handleError}
        accept={accept}
        maxSize={maxSize}
        isPending={isPending}
      />

      {/* Upload Queue */}
      {uploadItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              Upload Queue ({uploadItems.length})
            </h3>
            <div className="flex gap-2">
              <Button
                onClick={uploadAll}
                disabled={
                  isPending ||
                  !uploadItems.some((item) => item.status === 'ready')
                }
                size="sm"
              >
                Upload All Ready
              </Button>
              <Button onClick={clearAll} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {uploadItems.map((item) => (
              <UploadItemCard
                key={item.id}
                item={item}
                onUpdate={(updates) => updateItem(item.id, updates)}
                onRemove={() => removeItem(item.id)}
                onStartCrop={() => startCropping(item.id)}
                onConfirmCrop={() => confirmCrop(item.id)}
                onCancelCrop={() => cancelCrop(item.id)}
                onUpload={() => uploadSingle(item.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
