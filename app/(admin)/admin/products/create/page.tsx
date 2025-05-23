import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { BackButton } from '@/components/shared/back-button';
import { PageLayout } from '../components/page-layout';
import { CreateProductForm } from './components/create-product-form';

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
      <PageLayout>
        <PageLayout.Heading>
          <div className="flex items-center gap-3 md:gap-4">
            <BackButton />
            <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
              Create Product
            </h1>
          </div>
        </PageLayout.Heading>
        <PageLayout.Content>
          <CreateProductForm />
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
