import { QueryClient } from '@tanstack/react-query';
import { queryClient } from './queryClient';

// Reset the QueryClient before each test
global.beforeEach(() => {
  // Clear the QueryClient to avoid test interference
  queryClient.clear();
});
