'use client';

import type { MediaItem } from '@/components/shared/media-upload/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVerticalIcon, ImageIcon, StarIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageSelectionSheet } from './image-selection-sheet';
import { useProductImages } from './use-product-images';

type SelectedImagesDisplayProps = {
  initialImageIds?: string[];
  onChange: (imageIds: string[]) => void;
};

export function SelectedImagesDisplay({
  initialImageIds = [],
  onChange,
}: SelectedImagesDisplayProps) {
  const {
    imageIds,
    confirmedImageIds,
    mediaItems,
    isLoading,
    primaryImageId,
    removeImage,
    reorderImages,
    replaceImages,
    confirmSelection,
  } = useProductImages(initialImageIds);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Notify parent when confirmed imageIds change
  useEffect(() => {
    onChange(confirmedImageIds);
  }, [confirmedImageIds, onChange]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = imageIds.indexOf(active.id as string);
      const newIndex = imageIds.indexOf(over.id as string);
      reorderImages(oldIndex, newIndex);
    }

    setActiveId(null);
  };

  const handleSelectionChange = (newImageIds: string[]) => {
    replaceImages(newImageIds);
    confirmSelection(); // Images are already confirmed when this is called
  };

  const activeItem = mediaItems.find((item) => item.id === activeId);

  if (confirmedImageIds.length === 0) {
    return (
      <div className="space-y-3">
        <ImageSelectionSheet
          selectedImageIds={confirmedImageIds}
          onSelectionChange={handleSelectionChange}
        >
          <Button variant="outline" className="w-full">
            <ImageIcon className="size-4" />
            Select Images (0/4)
          </Button>
        </ImageSelectionSheet>
        <p className="text-muted-foreground text-sm">
          Select up to 4 images for your product. The first image will be the
          primary image.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {confirmedImageIds.length}/4 images selected
        </p>
        <ImageSelectionSheet
          selectedImageIds={confirmedImageIds}
          onSelectionChange={handleSelectionChange}
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={confirmedImageIds.length >= 4}
          >
            {confirmedImageIds.length >= 4 ? 'Maximum reached' : 'Add more'}
          </Button>
        </ImageSelectionSheet>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {Array.from({ length: confirmedImageIds.length }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={confirmedImageIds}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {mediaItems.map((item, index) => (
                <SortableImageItem
                  key={item.id}
                  item={item}
                  isPrimary={index === 0}
                  onRemove={() => removeImage(item.id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeItem && (
              <div className="aspect-square w-24 overflow-hidden rounded-lg border-2 border-primary bg-background shadow-lg">
                <Image
                  src={activeItem.url}
                  alt={activeItem.alt || activeItem.originalName}
                  width={96}
                  height={96}
                  className="size-full object-cover"
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}

      {primaryImageId && (
        <p className="text-muted-foreground text-xs">
          <StarIcon className="mr-1 inline-block size-3 text-yellow-500" />
          The first image will be shown as the primary image in product listings
        </p>
      )}
    </div>
  );
}

// Simplified sortable item component
function SortableImageItem({
  item,
  isPrimary,
  onRemove,
}: {
  item: MediaItem;
  isPrimary: boolean;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'group relative aspect-square overflow-hidden rounded-lg border transition-all',
        isDragging
          ? 'border-primary shadow-lg'
          : 'border-border hover:border-primary/50',
        isPrimary && 'ring-2 ring-yellow-500'
      )}
    >
      <Image
        src={item.url}
        alt={item.alt || item.originalName}
        fill
        className="object-cover object-center"
      />

      {/* Primary indicator */}
      {isPrimary && (
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center justify-center rounded-full bg-yellow-500 p-1">
            <StarIcon className="h-3 w-3 text-white" />
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20">
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          {/* Remove button */}
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="size-6"
            onClick={onRemove}
          >
            <XIcon className="size-3" />
          </Button>
        </div>

        {/* Drag handle */}
        <div
          {...attributes}
          {...listeners}
          className="-translate-y-1/2 absolute top-1/2 right-2 cursor-grab opacity-0 transition-opacity active:cursor-grabbing group-hover:opacity-100"
        >
          <div className="rounded bg-black/50 p-2">
            <GripVerticalIcon className="size-5 text-white" />
          </div>
        </div>
      </div>

      {/* Filename overlay */}
      <div className="absolute right-0 bottom-0 left-0 truncate bg-gradient-to-t from-black/70 to-transparent p-2 text-white text-xs">
        {item.originalName}
      </div>
    </div>
  );
}
