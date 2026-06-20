import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@sparticuz/chromium', 'puppeteer-core'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.vegnar.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/a1aa/**',
      },
      {
        protocol: 'https',
        hostname: 'www.vegnar.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Powered-By',
            value: ''
          },
          {
            key: 'Server',
            value: ''
          }
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'vegnar.com',
          },
        ],
        destination: 'https://www.vegnar.com/:path*',
        permanent: true,
      },
      // Fix ?p=1 parameter redirect
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'p',
            value: '1',
          },
        ],
        destination: 'https://www.vegnar.com/',
        permanent: true,
      },
    ]
  },
  // Improve build performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
