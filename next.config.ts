import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "vaishnaviorganics.store",
      },
    ],
    // Enable optimization
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'date-fns', 'lodash'],
    // Enable App Router optimizations
    serverComponentsExternalPackages: ['mongoose'],
  },
  compress: true,
  // Enable gzip compression for responses

  env: {
    // Force local MongoDB to override any system env vars pointing to blocked Cloud Atlas
    MONGODB_URI: "mongodb://localhost:27017/sweet",
  },
  // Add caching headers for static assets
  headers: async () => {
    return [
      {
        source: '/public/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
// Force restart: 02/03/2026 14:17:08
