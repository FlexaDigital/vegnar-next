/** @type {import('next').NextConfig} */
const nextConfig = {
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
      // Redirect HTTP CMS to HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cms.vegnar.com',
          },
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://cms.vegnar.com/:path*',
        permanent: true,
      },
      // Fix duplicate product URLs - redirect old format to new
      {
        source: '/products/bagasse-products/:slug*',
        destination: '/products/bowls/:slug*',
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
  // Add other configurations here if needed
};

module.exports = nextConfig; 