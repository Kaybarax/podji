import React from 'react';
import { QueryClientProvider, queryClient } from '@podji/stores';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}