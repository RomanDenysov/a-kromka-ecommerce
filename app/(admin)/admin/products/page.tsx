import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { getProducts } from '@/app/actions/products/queries';
import { Button, buttonVariants } from '@/components/ui/button';
import { format } from 'date-fns';
import { sk } from 'date-fns/locale';
import { DownloadIcon, PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { columns } from './components/columns';
import { PageLayout } from './components/page-layout';
import { ProductsTable } from './components/products-table';

export default async function AdminProductsPage() {
  const productsData = await getProducts();

  const data = productsData.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.productImages[0]?.image?.url || '/images/placeholder.jpg',
    price: product.priceCents / 100,
    status: product.status,
    createdAt: format(product.createdAt, 'dd.MM.yyyy HH:mm', { locale: sk }),
  }));
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products' },
        ]}
      />
      <PageLayout>
        <PageLayout.Heading>
          <div className="flex items-center gap-3 md:gap-4">
            {/* <BackButton /> */}
            <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
              Products
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {/* TODO: Add export functionality */}
            <Button variant="outline">
              <DownloadIcon />
              Export
            </Button>
            <Link href="/admin/products/create" className={buttonVariants()}>
              <PackagePlusIcon />
              Add Product
            </Link>
          </div>
        </PageLayout.Heading>
        <PageLayout.Content>
          <ProductsTable columns={columns} data={data} />
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
