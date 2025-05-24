'use client';
import { UploadIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

type MediaUploadDropzoneProps = {
  onDrop: (files: File[]) => void;
  onError: (error: string) => void;
  accept: string[];
  maxSize: number;
  isPending: boolean;
};

export function MediaUploadDropzone({
  onDrop,
  onError,
  accept,
  maxSize,
  isPending,
}: MediaUploadDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.fromEntries(accept.map((type) => [type, []])),
    maxSize,
    multiple: true,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection?.errors[0]?.code === 'file-too-large') {
        onError('Some files exceed 4.5MB limit');
      } else if (rejection?.errors[0]?.code === 'file-invalid-type') {
        onError(
          'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
        );
      } else {
        onError('Some files failed to upload. Please try again.');
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-gray-300 hover:border-gray-400'
      } ${isPending ? 'pointer-events-none opacity-50' : ''}`}
    >
      <input {...getInputProps()} />
      <UploadIcon className="mx-auto mb-4 h-12 w-12 text-gray-400" />
      <p className="font-medium text-lg">
        {isDragActive ? 'Drop the files here' : 'Drag & drop images here'}
      </p>
      <p className="text-gray-500">or click to select files</p>
      <p className="mt-2 text-gray-400 text-sm">
        Max size: 4.5MB per file • Formats: JPEG, PNG, WebP, GIF
      </p>
    </div>
  );
}
