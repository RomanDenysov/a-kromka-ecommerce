import { DashboardHeader } from '../components/dashboard-header';

export default function DashboardPage() {
  return (
    <>
      <DashboardHeader breadcrumbs={[{ label: 'Dashboard' }]} />
      <div className="container mx-auto w-full px-4 py-6">
        <h1 className="font-bold text-xl md:text-2xl">Dashboard</h1>
      </div>
    </>
  );
}
