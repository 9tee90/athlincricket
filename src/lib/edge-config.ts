import { createClient } from '@vercel/edge-config';

export const edgeConfig = createClient('ecfg_2og98beb6f41mm20oyeaeeuu6zhh');

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