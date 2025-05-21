import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
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
        <h1 className="font-bold text-2xl">{product?.name}</h1>
      </div>
    </>
  );
}
