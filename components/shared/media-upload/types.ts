export type MediaItem = {
  id: string;
  url: string;
  filename: string;
  originalName: string;
  alt: string | null;
  caption: string | null;
};

export type UploadItem = {
  id: string;
  file: File;
  originalSrc: string;
  croppedSrc?: string;
  croppedFile?: File;
  alt: string;
  caption: string;
  status: 'pending' | 'cropping' | 'ready' | 'uploading' | 'uploaded' | 'error';
  error?: string;
  crop?: { x: number; y: number };
  zoom?: number;
  croppedAreaPixels?: { x: number; y: number; width: number; height: number };
  aspectRatio?: number;
};

export type AspectRatioPreset = {
  name: string;
  ratio: number;
  description: string;
};

export type MediaUploadProps = {
  onUploadComplete?: (media: MediaItem) => void;
  accept?: string[];
  maxSize?: number;
};
