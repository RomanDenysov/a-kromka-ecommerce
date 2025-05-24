'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UploadItem } from './types';

type ItemFormProps = {
  item: UploadItem;
  onUpdate: (updates: Partial<UploadItem>) => void;
};

export function ItemForm({ item, onUpdate }: ItemFormProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div>
        <Label className="text-xs">Alt Text</Label>
        <Input
          value={item.alt}
          onChange={(e) => onUpdate({ alt: e.target.value })}
          placeholder="Describe the image"
          className="text-sm"
        />
      </div>
      <div>
        <Label className="text-xs">Caption</Label>
        <Input
          value={item.caption}
          onChange={(e) => onUpdate({ caption: e.target.value })}
          placeholder="Optional caption"
          className="text-sm"
        />
      </div>
    </div>
  );
}
