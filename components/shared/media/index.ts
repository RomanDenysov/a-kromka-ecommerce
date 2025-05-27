// Shared media hooks and utilities
export { useMediaSelection } from './use-media-selection';
export { useMediaFetch, useMediaByIds } from './use-media-fetch';

// Re-export from media-upload for convenience
export type {
  MediaItem,
  MediaItemBasic,
  MediaUploadProps,
} from '../media-upload/types';
export { MediaGallery } from '../media-gallery';
