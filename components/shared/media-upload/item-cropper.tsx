'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeftIcon, CheckIcon } from 'lucide-react';
import { useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { AspectRatioSelector } from './aspect-ratio-selector';
import type { UploadItem } from './types';

type ItemCropperProps = {
  item: UploadItem;
  onUpdate: (updates: Partial<UploadItem>) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ItemCropper({
  item,
  onUpdate,
  onConfirm,
  onCancel,
}: ItemCropperProps) {
  const onCropComplete = useCallback(
    (
      _croppedArea: unknown,
      croppedAreaPixels: { x: number; y: number; width: number; height: number }
    ) => {
      onUpdate({ croppedAreaPixels });
    },
    [onUpdate]
  );

  return (
    <div className="space-y-3">
      <AspectRatioSelector
        selectedRatio={item.aspectRatio || 1}
        onRatioChange={(ratio) => onUpdate({ aspectRatio: ratio })}
      />

      <div className="relative h-80 w-full overflow-hidden rounded-md bg-gray-100">
        <Cropper
          image={item.originalSrc}
          crop={item.crop || { x: 0, y: 0 }}
          zoom={item.zoom || 1}
          aspect={item.aspectRatio || 1}
          onCropChange={(crop) => onUpdate({ crop })}
          onCropComplete={onCropComplete}
          onZoomChange={(zoom) => onUpdate({ zoom })}
        />
      </div>

      <div className="flex items-center gap-2">
        <Label className="text-xs">Zoom:</Label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={item.zoom || 1}
          onChange={(e) => onUpdate({ zoom: Number(e.target.value) })}
          className="flex-1"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={onConfirm} size="sm">
          <CheckIcon className="size-4" />
          Confirm
        </Button>
        <Button onClick={onCancel} variant="outline" size="sm">
          <ArrowLeftIcon className="size-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
