'use client';

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { UploadThingProvider } from "./uploadthing-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <UploadThingProvider>
        {children}
        <Toaster />
      </UploadThingProvider>
    </ThemeProvider>
  );
} 