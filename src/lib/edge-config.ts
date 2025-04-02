import { createClient } from '@vercel/edge-config';

if (!process.env.EDGE_CONFIG) {
  throw new Error('EDGE_CONFIG environment variable is not set');
}

export const edgeConfig = createClient(process.env.EDGE_CONFIG);

export type AppConfig = {
  maintenanceMode: boolean;
  maxUploadSize: number;
  allowedVideoFormats: string[];
  apiRateLimit: number;
  features: {
    challenges: boolean;
    sponsorships: boolean;
    xproFeedback: boolean;
  };
};

export async function getAppConfig(): Promise<AppConfig | null> {
  try {
    const config = await edgeConfig.get<AppConfig>('app');
    return config ?? null;
  } catch (error) {
    console.error('Failed to fetch Edge Config:', error);
    return null;
  }
} 