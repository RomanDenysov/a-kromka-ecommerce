import type { ReactNode } from 'react';
import { Toaster } from '../ui/sonner';

type ProvidersProps = {
  readonly children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
