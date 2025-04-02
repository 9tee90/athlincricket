"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { api } from '@/trpc/react';
import { SessionProvider } from "next-auth/react"
import { Toaster } from "sonner"
import { UploadThingProvider } from "@/components/providers/uploadthing-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );

  return (
    <SessionProvider>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <UploadThingProvider>
            {children}
            <Toaster />
          </UploadThingProvider>
        </QueryClientProvider>
      </api.Provider>
    </SessionProvider>
  );
} 