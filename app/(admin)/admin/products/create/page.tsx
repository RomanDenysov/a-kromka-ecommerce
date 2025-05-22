import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { BackButton } from '@/components/shared/back-button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function AdminProductCreatePage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'New Product' },
        ]}
      />
      <div className="container mx-auto w-full px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BackButton />
            <h1 className="font-bold text-xl md:text-2xl">Create Product</h1>
          </div>
        </div>
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
