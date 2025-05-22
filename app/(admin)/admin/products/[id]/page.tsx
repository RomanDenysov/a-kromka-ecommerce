import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { BackButton } from '@/components/shared/back-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { getProduct } from '../dummyProductsData';

export default async function AdminProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedId = decodeURIComponent((await params).id);

  const product = await getProduct(decodedId);

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: product?.name || 'Product' },
        ]}
      />
      <div className="container mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="truncate font-bold text-xl md:text-2xl">
              {product?.name || 'Product'}
            </h1>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="destructive">
              <TrashIcon />
              Delete
            </Button>
            <Link
              href={`/admin/products/${product?.id}/edit`}
              className={buttonVariants({ variant: 'outline' })}
            >
              <PencilIcon />
              Edit
            </Link>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="destructive" size="icon">
              <TrashIcon />
            </Button>
            <Link
              href={`/admin/products/${product?.id}/edit`}
              className={buttonVariants({ variant: 'outline', size: 'icon' })}
            >
              <PencilIcon />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
