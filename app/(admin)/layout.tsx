import { CategorySheet } from '@/components/features/admin/category/ui/category-sheet';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';
import AdminSidebar from './components/admin-sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AdminSidebar>{children}</AdminSidebar>
      <CategorySheet />
    </SidebarProvider>
  );
}
