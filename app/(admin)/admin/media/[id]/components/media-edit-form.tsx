'use client';

import { updateMedia } from '@/app/actions/media';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { type FormEvent, useState, useTransition } from 'react';

type MediaEditFormProps = {
  media: {
    id: string;
    filename: string;
    alt: string | null;
    caption: string | null;
  };
  className?: string;
};

export function MediaEditForm({ media, className }: MediaEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    filename: media.filename,
    alt: media.alt || '',
    caption: media.caption || '',
  });
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = await updateMedia(media.id, formData);

      if (result.success) {
        setMessage({ type: 'success', text: 'Media updated successfully' });
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage({
          type: 'error',
          text: result.error || 'Failed to update media',
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className={cn('h-full space-y-4', className)}>
      <div>
        <Label htmlFor="filename" className="font-medium text-sm">
          Filename
        </Label>
        <Input
          id="filename"
          value={formData.filename}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, filename: e.target.value }))
          }
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="alt" className="font-medium text-sm">
          Alt Text
        </Label>
        <Input
          id="alt"
          value={formData.alt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, alt: e.target.value }))
          }
          placeholder="Describe the image for accessibility"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="caption" className="font-medium text-sm">
          Caption
        </Label>
        <Textarea
          id="caption"
          value={formData.caption}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, caption: e.target.value }))
          }
          placeholder="Optional caption for the image"
          rows={3}
          className="mt-1"
        />
      </div>

      {message && (
        <div
          className={`rounded-md p-3 text-sm ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.type === 'success' && (
            <CheckIcon className="mr-2 inline h-4 w-4" />
          )}
          {message.text}
        </div>
      )}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Media'
        )}
      </Button>
    </form>
  );
}
