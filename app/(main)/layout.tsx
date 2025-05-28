import type { ReactNode } from 'react';
import { Header } from './components/header';
import { SpecialBanner } from './components/special-banner';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Marketing Banner - positioned above header */}
      <SpecialBanner />

      <Header />
      <div className="container mx-auto flex-1 px-4">{children}</div>
    </main>
  );
}
