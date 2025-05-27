import { getMedia } from '@/app/actions/media/queries';
import { CheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type MediaItem = {
  id: string;
  url: string;
  filename: string;
  originalName: string;
  alt: string | null;
  caption: string | null;
  createdAt: Date;
  mimeType: string;
  size: string;
};

type MediaGalleryProps = {
  selectedId?: string;
  page?: number;
  limit?: number;
  onSelect?: never; // Server component cannot have click handlers
};

export async function MediaGallery({
  selectedId,
  page = 1,
  limit = 20,
}: MediaGalleryProps) {
  const mediaItems = await getMedia(page, limit);

  if (mediaItems.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        No images found. Upload your first image to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {mediaItems.map((item) => (
        <MediaGalleryItem
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
        />
      ))}
    </div>
  );
}

// Server component for individual gallery items
function MediaGalleryItem({
  item,
  isSelected,
}: {
  item: MediaItem;
  isSelected: boolean;
}) {
  return (
    <Link
      href={`/admin/media/${item.id}`}
      className="group relative overflow-hidden rounded-lg border border-transparent transition-all hover:border-accent-foreground/70 hover:shadow-sm"
    >
      <Image
        src={item.url}
        alt={item.alt || item.originalName}
        width={200}
        height={200}
        className="aspect-square h-full w-full object-cover"
      />
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-primary/20">
          <div className="rounded-full bg-primary p-1">
            <CheckIcon className="size-4 text-white" />
          </div>
        </div>
      )}
      <div className="absolute right-0 bottom-0 left-0 truncate bg-black/50 p-2 text-white text-xs backdrop:blur-md">
        {item.originalName}
      </div>
    </Link>
  );
}
