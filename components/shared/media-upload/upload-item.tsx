'use client';

import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { ItemActions } from './item-actions';
import { ItemCropper } from './item-cropper';
import { ItemForm } from './item-form';
import type { UploadItem } from './types';

type UploadItemCardProps = {
  item: UploadItem;
  onUpdate: (updates: Partial<UploadItem>) => void;
  onRemove: () => void;
  onStartCrop: () => void;
  onConfirmCrop: () => void;
  onCancelCrop: () => void;
  onUpload: () => void;
};

function getStatusColor(status: UploadItem['status']) {
  switch (status) {
    case 'pending':
      return 'bg-muted text-muted-foreground';
    case 'cropping':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'ready':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'uploading':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'uploaded':
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
    case 'error':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
}

export function UploadItemCard({
  item,
  onUpdate,
  onRemove,
  onStartCrop,
  onConfirmCrop,
  onCancelCrop,
  onUpload,
}: UploadItemCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex gap-4">
        {/* Image Preview */}
        <div className="flex-shrink-0">
          <div className="relative size-40">
            <Image
              src={item.croppedSrc || item.originalSrc}
              alt={item.file.name}
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="max-w-xs truncate font-medium text-sm">
                {item.file.name}
              </h4>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`rounded px-2 py-1 font-medium text-xs ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </span>
                <span className="text-muted-foreground text-xs">
                  {Math.round(item.file.size / 1024)}KB
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={onRemove}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          {/* Error Message */}
          {item.error && (
            <div className="rounded bg-destructive/10 p-2 text-destructive text-sm">
              {item.error}
            </div>
          )}

          {/* Cropping Interface */}
          {item.status === 'cropping' && (
            <ItemCropper
              item={item}
              onUpdate={onUpdate}
              onConfirm={onConfirmCrop}
              onCancel={onCancelCrop}
            />
          )}

          {/* Metadata Form */}
          {(item.status === 'pending' || item.status === 'ready') && (
            <ItemForm item={item} onUpdate={onUpdate} />
          )}

          {/* Actions */}
          <ItemActions
            item={item}
            onUpload={onUpload}
            onStartCrop={onStartCrop}
          />
        </div>
      </div>
    </div>
  );
}
