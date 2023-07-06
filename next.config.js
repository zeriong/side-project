/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/side-project',
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['*','firebasestorage.googleapis.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig