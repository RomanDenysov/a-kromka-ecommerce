'use client';

import { LoadingButton } from '@/components/shared/loading-button';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useEffect } from 'react';
import { useCategorySheet } from '../hook/use-category-sheet';
import { useCreateCategoryForm } from '../hook/use-create-category-form';
import { CreateCategoryForm } from './create-category-form';

export function CategorySheet() {
  const open = useCategorySheet((state) => state.open);
  const onOpenChange = useCategorySheet((state) => state.onOpenChange);
  const { form, onSubmit, isLoading } = useCreateCategoryForm();

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>
            Add a new category for your products.
          </SheetDescription>
        </SheetHeader>
        <CreateCategoryForm form={form} onSubmit={onSubmit} />
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Cancel
            </Button>
          </SheetClose>
          <LoadingButton
            form="create-category-form"
            type="submit"
            isLoading={isLoading}
          >
            Create Category
          </LoadingButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
