import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default query options can be set here
      // These will be used by all useQuery hooks unless overridden
      retry: 1,
      refetchOnWindowFocus: false,
      // Configure default staleTime (how long data remains fresh)
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Configure default gcTime (how long unused data remains in cache)
      // Note: In React Query v5, 'cacheTime' was renamed to 'gcTime'
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Re-export QueryClientProvider from @tanstack/react-query
export { QueryClientProvider } from '@tanstack/react-query';
