import { Separator } from '@/components/ui/separator';
import type { ReactNode } from 'react';

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="container mx-auto w-full px-4 pt-6 pb-20">{children}</div>
  );
}

function Heading({ children }: PageLayoutHeaderProps) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function Content({ children }: PageLayoutContentProps) {
  return (
    <>
      <Separator className="my-4" />
      {children}
    </>
  );
}

PageLayout.Heading = Heading;
PageLayout.Content = Content;

// Types
export interface PageLayoutProps {
  children: ReactNode;
}
export interface PageLayoutHeaderProps {
  children: ReactNode;
}
export interface PageLayoutContentProps {
  children: ReactNode;
}
