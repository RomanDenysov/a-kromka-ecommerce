import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { BackButton } from '@/components/shared/back-button';
import { Button, buttonVariants } from '@/components/ui/button';
import { PencilIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { PageLayout } from '../components/page-layout';
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
      <PageLayout>
        <PageLayout.Heading>
          <div className="flex items-center gap-3 md:gap-4">
            <BackButton />
            <h1 className="truncate font-medium text-xl sm:text-2xl md:text-3xl">
              {product?.name || 'Product'}
            </h1>
          </div>
          <ProductActions id={product?.id || ''} />
        </PageLayout.Heading>
        <PageLayout.Content>
          <p>Product</p>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}

function ProductActions({ id }: { id: string }) {
  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <Button variant="destructive">
          <TrashIcon />
          Delete
        </Button>
        <Link
          href={`/admin/products/${id}/edit`}
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
          href={`/admin/products/${id}/edit`}
          className={buttonVariants({ variant: 'outline', size: 'icon' })}
        >
          <PencilIcon />
        </Link>
      </div>
    </>
  );
}
