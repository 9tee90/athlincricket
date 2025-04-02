/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'placehold.co'],
  },
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: ['@uploadthing/react'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

export default nextConfig 