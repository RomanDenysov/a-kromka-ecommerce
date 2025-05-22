import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { Button, buttonVariants } from '@/components/ui/button';
import { DownloadIcon, PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { columns } from './components/columns';
import { PageLayout } from './components/page-layout';
import { ProductsTable } from './components/products-table';
import { getProducts } from './dummyProductsData';

export default async function AdminProductsPage() {
  const data = await getProducts();
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
