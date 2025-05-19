import type { ReactNode } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
} from '@/components/ui/sidebar';
import { NavHeader } from './nav-header';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';
import { Search } from './search';

export type AdminSidebarProps = {
  readonly children: ReactNode;
};

export default function AdminSidebar({ children }: AdminSidebarProps) {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <NavHeader />
        </SidebarHeader>
        <Search />
        <SidebarContent>
          <NavMain />
          <NavSecondary className="mt-auto" />
        </SidebarContent>
        {/* <SidebarFooter></SidebarFooter> */}
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
