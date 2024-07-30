import type { QueryClientConfig } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      //  Defaults is 0 milliseconds
      staleTime: 0,
      // Defaults is 5 * 60 * 1000 (5 minutes)
      gcTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
      //  Defaults is 3
      retry: 0,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
