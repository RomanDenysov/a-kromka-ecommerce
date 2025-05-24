'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ASPECT_RATIO_PRESETS } from './constants';

type AspectRatioSelectorProps = {
  selectedRatio: number;
  onRatioChange: (ratio: number) => void;
};

export function AspectRatioSelector({
  selectedRatio,
  onRatioChange,
}: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs">Image format:</Label>
      <div className="flex flex-wrap gap-1">
        {ASPECT_RATIO_PRESETS.map((preset) => (
          <Button
            key={preset.name}
            variant={selectedRatio === preset.ratio ? 'default' : 'outline'}
            size="sm"
            onClick={() => onRatioChange(preset.ratio)}
            className="h-6 px-2 text-xs"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
