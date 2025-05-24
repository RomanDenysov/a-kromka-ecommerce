'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon, CropIcon, UploadIcon } from 'lucide-react';
import type { UploadItem } from './types';

type ItemActionsProps = {
  item: UploadItem;
  onUpload: () => void;
  onStartCrop: () => void;
};

export function ItemActions({ item, onUpload, onStartCrop }: ItemActionsProps) {
  if (item.status === 'pending') {
    return (
      <div className="flex gap-2">
        <Button onClick={onUpload} size="sm" className="w-full flex-1">
          <UploadIcon className="size-4" />
          Upload
        </Button>
        <Button
          onClick={onStartCrop}
          size="sm"
          variant="outline"
          className="w-full flex-1"
        >
          <CropIcon className="size-4" />
          Crop
        </Button>
      </div>
    );
  }

  if (item.status === 'ready') {
    return (
      <div className="flex gap-2">
        <Button onClick={onUpload} size="sm" className="w-full flex-1">
          <UploadIcon className="size-4" />
          Upload
        </Button>
        <Button
          onClick={onStartCrop}
          size="sm"
          variant="outline"
          className="w-full flex-1"
        >
          <CropIcon className="size-4" />
          Re-crop
        </Button>
      </div>
    );
  }

  if (item.status === 'uploaded') {
    return (
      <div className="flex items-center gap-2 text-green-600 text-sm">
        <CheckIcon className="size-4" />
        Uploaded successfully
      </div>
    );
  }

  if (item.status === 'uploading') {
    return <div className="text-muted-foreground text-sm">Uploading...</div>;
  }

  return null;
}
