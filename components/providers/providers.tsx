'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Provider as WBProvider } from 'react-wrap-balancer';
import { Toaster } from '../ui/sonner';

type ProvidersProps = {
  readonly children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 5 * 60 * 1000, // 5 minutes
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WBProvider>
        <Toaster />
        {children}
      </WBProvider>
    </QueryClientProvider>
  );
}
