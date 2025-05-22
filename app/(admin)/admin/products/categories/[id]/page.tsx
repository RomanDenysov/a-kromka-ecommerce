import { DashboardHeader } from '@/app/(admin)/components/dashboard-header';
import { PageLayout } from '../../components/page-layout';

export default async function AdminProductCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const decodedId = decodeURIComponent((await params).id);

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Products', href: '/admin/products' },
          { label: 'Categories', href: '/admin/products/categories' },
          {
            label: 'Category',
            href: `/admin/products/categories/${decodedId}`,
          },
        ]}
      />
      <PageLayout>
        <PageLayout.Heading>
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
            Category
          </h1>
        </PageLayout.Heading>
        <PageLayout.Content>
          <p>Category</p>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
