import { create } from 'zustand';

type CategorySheetState = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const useCategorySheet = create<CategorySheetState>((set) => ({
  open: false,
  onOpenChange: (open) => set({ open }),
}));
