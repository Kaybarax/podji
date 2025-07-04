'use client';

import React from 'react';
import { QueryClientProvider, queryClient } from '@podji/stores';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Check if we're running in a browser environment
  const isBrowser = typeof window !== 'undefined';

  // If we're not in a browser environment, just render the children without the provider
  if (!isBrowser) {
    return <>{children}</>;
  }

  // In browser environment, use the QueryClientProvider
  return <QueryClientProvider client={queryClient}>{children as any}</QueryClientProvider>;
}
