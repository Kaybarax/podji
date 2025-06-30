import React from 'react';
import { QueryClientProvider, queryClient } from '@shared/stores';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}