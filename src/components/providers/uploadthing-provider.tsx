'use client';

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { uploadthingConfig } from "@/lib/uploadthing-config";

export function UploadThingProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextSSRPlugin routerConfig={extractRouterConfig(uploadthingConfig)} />
      {children}
    </>
  );
} 