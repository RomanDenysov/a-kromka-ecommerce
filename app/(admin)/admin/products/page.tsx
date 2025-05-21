import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DownloadIcon, PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { columns } from './components/columns';
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
      <div className="container mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between px-2">
          <h1 className="font-bold text-2xl">Products</h1>
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
        </div>
        <Separator className="my-4" />
        <ProductsTable columns={columns} data={data} />
      </div>
    </>
  );
}
