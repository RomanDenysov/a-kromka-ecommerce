import { useMediaByIds } from '@/components/shared/media/use-media-fetch';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';

export function useProductImages(initialImageIds: string[] = []) {
  const [imageIds, setImageIds] = useState<string[]>(initialImageIds);
  const [confirmedImageIds, setConfirmedImageIds] =
    useState<string[]>(initialImageIds);

  // Only fetch media items for confirmed images
  const { data: mediaItems = [], isLoading } = useMediaByIds(confirmedImageIds);

  // Primary image is always the first one in the array
  const primaryImageId = confirmedImageIds[0] || '';

  const addImages = useCallback((newImageIds: string[]) => {
    setImageIds((prev) => {
      const combined = [...prev, ...newImageIds];
      // Remove duplicates and limit to 4
      const unique = Array.from(new Set(combined));
      return unique.slice(0, 4);
    });
  }, []);

  const removeImage = useCallback((imageId: string) => {
    setImageIds((prev) => prev.filter((id) => id !== imageId));
    setConfirmedImageIds((prev) => prev.filter((id) => id !== imageId));
  }, []);

  const reorderImages = useCallback((oldIndex: number, newIndex: number) => {
    setImageIds((prev) => arrayMove(prev, oldIndex, newIndex));
    setConfirmedImageIds((prev) => arrayMove(prev, oldIndex, newIndex));
  }, []);

  const replaceImages = useCallback((newImageIds: string[]) => {
    setImageIds(newImageIds.slice(0, 4)); // Limit to 4 images
  }, []);

  const confirmSelection = useCallback(() => {
    setConfirmedImageIds(imageIds);
  }, [imageIds]);

  const clearImages = useCallback(() => {
    setImageIds([]);
    setConfirmedImageIds([]);
  }, []);

  return {
    imageIds,
    confirmedImageIds,
    mediaItems,
    isLoading,
    primaryImageId,
    addImages,
    removeImage,
    reorderImages,
    replaceImages,
    confirmSelection,
    clearImages,
  };
}
