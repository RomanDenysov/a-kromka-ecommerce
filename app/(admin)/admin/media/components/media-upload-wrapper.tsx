'use client';

import { MediaUploadMulti } from '@/components/shared/media-upload/media-upload-multi';
import { useRouter } from 'next/navigation';

export function MediaUploadWrapper() {
  const router = useRouter();

  const handleUploadComplete = () => {
    router.refresh();
  };

  return <MediaUploadMulti onUploadComplete={handleUploadComplete} />;
}
