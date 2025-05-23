import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cms.vegnar.com', 'secure.gravatar.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.vegnar.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        pathname: '/avatar/**',
      },
    ],
  },
};

export default nextConfig;
