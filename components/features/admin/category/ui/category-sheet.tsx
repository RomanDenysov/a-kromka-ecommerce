import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function CategorySheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Category</SheetTitle>
          <SheetDescription>
            <p>This is the category of the product.</p>
            <p>You can add a new category or edit the existing one.</p>
          </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Save Changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
