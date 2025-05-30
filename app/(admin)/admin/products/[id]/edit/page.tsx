import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { BackButton } from '@/components/shared/back-button';
import { PageLayout } from '../../components/page-layout';
import { getProduct } from '../../dummyProductsData';

export default async function AdminProductEditPage({
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
          { label: `Edit ${product?.name || 'Product'}` },
        ]}
      />
      <PageLayout>
        <PageLayout.Heading>
          <div className="flex items-center gap-3 md:gap-4">
            <BackButton />
            <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
              Edit {product?.name || 'Product'}
            </h1>
          </div>
        </PageLayout.Heading>
        <PageLayout.Content>
          <p>Edit {product?.name || 'Product'}</p>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
