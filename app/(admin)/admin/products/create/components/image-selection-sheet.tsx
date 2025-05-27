'use client';

import type { MediaItem } from '@/components/shared/media-upload/types';
import { useMediaFetch } from '@/components/shared/media/use-media-fetch';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CheckIcon, ImageIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

type ImageSelectionSheetProps = {
  selectedImageIds: string[];
  onSelectionChange: (imageIds: string[]) => void;
  readonly children?: ReactNode;
};

export function ImageSelectionSheet({
  selectedImageIds,
  onSelectionChange,
  children,
}: ImageSelectionSheetProps) {
  const { data: mediaItems = [], isLoading } = useMediaFetch(1, 100);

  // Local state for temporary selection (before confirmation)
  const [tempSelectedIds, setTempSelectedIds] =
    useState<string[]>(selectedImageIds);

  const handleDone = () => {
    onSelectionChange(tempSelectedIds);
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedImageIds); // Reset to original selection
  };

  const renderImage = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      );
    }

    if (mediaItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <ImageIcon className="mb-2 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No images found</p>
          <p className="text-muted-foreground text-sm">
            Upload some images first
          </p>
        </div>
      );
    }
    return (
      <div className="grid max-h-96 grid-cols-3 gap-3 overflow-y-auto">
        {mediaItems.map((image: MediaItem) => {
          const isSelected = tempSelectedIds.includes(image.id);
          const canSelect = !isSelected && tempSelectedIds.length < 4;
          const handleImageSelect = (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();

            if (isSelected) {
              setTempSelectedIds((prev) =>
                prev.filter((id) => id !== image.id)
              );
            } else if (tempSelectedIds.length < 4) {
              setTempSelectedIds((prev) => [...prev, image.id]);
            }
          };

          return (
            <button
              key={image.id}
              type="button"
              onClick={handleImageSelect}
              disabled={!canSelect && !isSelected}
              aria-label={`${isSelected ? 'Remove' : 'Select'} image ${image.originalName}`}
              className={cn(
                'group relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all disabled:cursor-not-allowed disabled:opacity-50',
                isSelected && 'border-primary ring-2 ring-primary/20',
                canSelect && 'border-border hover:border-primary/50',
                !canSelect && !isSelected && 'border-border'
              )}
            >
              <Image
                src={image.url}
                alt={image.alt || image.originalName}
                fill
                className="object-cover"
              />

              {/* Selection overlay */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
                  <div className="rounded-full bg-primary p-1">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              )}

              {/* Filename overlay */}
              <div className="absolute right-0 bottom-0 left-0 truncate bg-black/50 p-1 text-white text-xs">
                {image.originalName}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          setTempSelectedIds(selectedImageIds); // Reset temp selection when opening
        }
      }}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Select Product Images</SheetTitle>
          <SheetDescription>
            Choose up to 4 images for your product. Click "Done" to confirm your
            selection.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4 py-2">
          {/* Available Images Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">Available Images</h3>
              <p className="text-muted-foreground text-sm">
                {tempSelectedIds.length}/4 selected
              </p>
            </div>
            {renderImage()}
            <Link
              href="/admin/media?origin=product-create"
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full')}
            >
              <PlusIcon className="size-4" />
              Upload Images
            </Link>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="button" onClick={handleDone}>
              Done ({tempSelectedIds.length}/4)
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
