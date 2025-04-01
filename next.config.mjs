/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com'],
  },
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig 