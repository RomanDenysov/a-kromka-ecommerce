import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { isAuthenticated } from '../actions/auth';

export default async function HomePage() {
  const isAuth = await isAuthenticated();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {isAuth ? (
        <Link href="/admin" className={buttonVariants({ variant: 'outline' })}>
          Go to dashboard
        </Link>
      ) : (
        <Link href="/auth" className={buttonVariants({ variant: 'default' })}>
          Sign in
        </Link>
      )}
    </div>
  );
}
