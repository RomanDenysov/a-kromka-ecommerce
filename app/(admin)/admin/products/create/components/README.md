# Product Image Selection Component

## Overview

The `SelectedImagesDisplay` component provides a user-friendly interface for selecting and managing product images during product creation. It uses a custom hook for internal state management and automatically sets the first image as the primary image.

## Features

- Select up to 4 images from existing media
- Drag and drop to reorder images
- First image is automatically the primary image
- Remove selected images
- Internal state management with custom hook

## Components

### `SelectedImagesDisplay`

A component that displays selected images with drag-and-drop reordering capabilities.

**Props:**
- `initialImageIds?: string[]` - Initial array of selected image IDs
- `onChange: (imageIds: string[]) => void` - Callback when image selection changes

### `useProductImages` Hook

A custom hook that manages the internal state of product images.

**Returns:**
- `imageIds: string[]` - Current array of selected image IDs
- `mediaItems: MediaItem[]` - Fetched media items for selected IDs
- `isLoading: boolean` - Loading state for media fetch
- `primaryImageId: string` - ID of the primary image (first in array)
- `addImages: (imageIds: string[]) => void` - Add new images
- `removeImage: (imageId: string) => void` - Remove an image
- `reorderImages: (oldIndex: number, newIndex: number) => void` - Reorder images
- `replaceImages: (imageIds: string[]) => void` - Replace all images
- `clearImages: () => void` - Clear all images

### `ImageSelectionSheet`

A sheet/modal component that displays available media items and allows selection.

**Props:**
- `selectedImageIds: string[]` - Array of currently selected image IDs
- `onSelectionChange: (imageIds: string[]) => void` - Callback when selection changes
- `children?: ReactNode` - Trigger element

## Key Improvements

1. **Simplified State Management**: Uses a custom hook to manage image state internally
2. **Automatic Primary Image**: First image in the array is automatically the primary image
3. **Reduced Prop Drilling**: Component manages its own state and only exposes the final result
4. **Better Performance**: Optimized with proper memoization and callbacks
5. **Optimized Network Requests**: Images are only fetched when user confirms selection by clicking "Done"

## Usage

```tsx
<SelectedImagesDisplay
  initialImageIds={form.watch('imageIds') || []}
  onChange={(imageIds: string[]) => {
    form.setValue('imageIds', imageIds);
  }}
/>
```

## Technical Details

- Uses `@dnd-kit/core` for drag and drop functionality
- Fetches media items using the `useMediaByIds` hook only after user confirmation
- `ImageSelectionSheet` manages temporary selection state until "Done" is clicked
- Implements proper accessibility with keyboard navigation
- Uses Shadcn UI components for consistent styling
- Follows the project's TypeScript and naming conventions
- Primary image is determined by array position (index 0)
- Network optimization: Images are fetched only when selection is confirmed 