"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { getQueryClient } from "@/components/providers/get-query-client";

interface TanstackQueryProviderProps {
  children: ReactNode;
}

const TanstackQueryProvider: React.FC<TanstackQueryProviderProps> = ({
  children,
}) => {
  const [queryClient] = React.useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackQueryProvider;
