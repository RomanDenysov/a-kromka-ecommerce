import { useCallback, useState } from 'react';

type UseMediaSelectionProps = {
  maxSelection?: number;
  initialSelection?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
};

export function useMediaSelection({
  maxSelection = 4,
  initialSelection = [],
  onSelectionChange,
}: UseMediaSelectionProps = {}) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);

  const toggleSelection = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        let newSelection: string[];

        if (prev.includes(id)) {
          // Remove from selection
          newSelection = prev.filter((selectedId) => selectedId !== id);
        } else if (prev.length < maxSelection) {
          // Add to selection if under limit
          newSelection = [...prev, id];
        } else {
          // At max capacity, don't add
          return prev;
        }

        onSelectionChange?.(newSelection);
        return newSelection;
      });
    },
    [maxSelection, onSelectionChange]
  );

  const isSelected = useCallback(
    (id: string) => selectedIds.includes(id),
    [selectedIds]
  );

  const canSelect = useCallback(
    (id: string) =>
      !selectedIds.includes(id) && selectedIds.length < maxSelection,
    [selectedIds, maxSelection]
  );

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const setSelection = useCallback(
    (ids: string[]) => {
      const limitedIds = ids.slice(0, maxSelection);
      setSelectedIds(limitedIds);
      onSelectionChange?.(limitedIds);
    },
    [maxSelection, onSelectionChange]
  );

  return {
    selectedIds,
    toggleSelection,
    isSelected,
    canSelect,
    clearSelection,
    setSelection,
    selectionCount: selectedIds.length,
    isAtMaxCapacity: selectedIds.length >= maxSelection,
  };
}
