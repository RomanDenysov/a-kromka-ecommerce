import { Fragment, type ReactNode } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type DashboardHeaderProps = {
  breadcrumbs: BreadcrumbItemType[];
  children?: ReactNode;
  className?: string;
};

export function DashboardHeader({
  breadcrumbs,
  children,
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-40 min-h-16 shrink-0 bg-gradient-to-b from-muted to-card',
        className
      )}
    >
      <div className="mb-6 flex h-16 w-full items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DashboardBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
      {children}
    </header>
  );
}

function DashboardBreadcrumbs({
  breadcrumbs,
}: { breadcrumbs: BreadcrumbItemType[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <Fragment key={item.label + idx}>
                {idx > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                <BreadcrumbItem className={isLast ? '' : 'hidden md:block'}>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href ?? '#'}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
