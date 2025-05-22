import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { PageLayout } from '../components/page-layout';

export default function AdminProductCategoriesPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'Categories' },
        ]}
      />
      <PageLayout>
        <PageLayout.Heading>
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
            Categories
          </h1>
        </PageLayout.Heading>
        <PageLayout.Content>
          <p>Categories</p>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
