import type { AspectRatioPreset } from './types';

export const ASPECT_RATIO_PRESETS: AspectRatioPreset[] = [
  {
    name: 'Square',
    ratio: 1,
    description: '1:1',
  },
  {
    name: 'Landscape',
    ratio: 16 / 9,
    description: '16:9',
  },
];

export const DEFAULT_ACCEPT_TYPES = ['image/*'];
export const DEFAULT_MAX_SIZE = 4.5 * 1024 * 1024; // 4.5MB
