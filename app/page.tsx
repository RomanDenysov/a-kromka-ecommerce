import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Link href="/auth" className={buttonVariants({ variant: 'default' })}>
        Sign in
      </Link>
    </div>
  );
}
