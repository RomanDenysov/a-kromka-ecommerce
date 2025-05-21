import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { Button, buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DownloadIcon, PackagePlusIcon } from 'lucide-react';
import Link from 'next/link';
import { type TableProduct, columns } from './components/columns';
import { ProductsTable } from './components/products-table';

// biome-ignore lint/suspicious/useAwait: <explanation>
async function getProducts(): Promise<TableProduct[]> {
  return [
    {
      id: '1',
      name: 'Product 1',
      price: '100.00',
      status: 'active',
      createdAt: '2021-01-01',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '2',
      name: 'Product 2',
      price: '200.50',
      status: 'draft',
      createdAt: '2021-01-01',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '3',
      name: 'Product 3',
      price: '300.100',
      status: 'sold',
      createdAt: '2021-01-01',
      image: '/images/rozky5ks.webp',
    },
    {
      id: '4',
      name: 'Product 4',
      price: '400.00',
      status: 'active',
      createdAt: '2021-01-01',
      image: '/images/rozky5ks.webp',
    },
  ];
}

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
        <div className="flex items-center justify-between">
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
