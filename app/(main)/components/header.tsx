import { Icons } from '@/components/shared/icons';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 flex min-h-16 w-full items-center border border-border border-b">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Icons.logo className="block size-8 md:hidden" />
            <Icons.kromka className="hidden h-5 md:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}
