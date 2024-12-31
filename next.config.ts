// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '**',
      },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = nextConfig