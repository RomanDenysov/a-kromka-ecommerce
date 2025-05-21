import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function AdminProductCreatePage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'Create' },
        ]}
      />
      <div className="container mx-auto w-full px-4 py-6">
        <h1 className="font-bold text-2xl">Create Product</h1>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-medium text-lg">Product Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Product Name</h3>
                <Input type="text" placeholder="Product Name" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
