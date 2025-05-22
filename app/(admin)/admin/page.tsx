import { DashboardHeader } from '../components/dashboard-header';
import { PageLayout } from './products/components/page-layout';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: 'Dashboard' }]} />
      <PageLayout>
        <PageLayout.Heading>
          <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
            Dashboard
          </h1>
        </PageLayout.Heading>
        <PageLayout.Content>
          <p>Dashboard</p>
        </PageLayout.Content>
      </PageLayout>
    </>
  );
}
