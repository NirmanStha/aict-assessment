import { QueryClient, environmentManager } from "@tanstack/react-query";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;
// Check if we're in a server environment and create a new QueryClient for each request, else reuse the same instance on the client
export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
