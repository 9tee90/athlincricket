'use client';

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SessionProvider } from "next-auth/react";

export function UploadThingProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
    </SessionProvider>
  );
} 