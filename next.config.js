/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: 'http://learncha-api-lb-136074801.ap-northeast-2.elb.amazonaws.com/api/v1/:path*',
  //     },
  //     {
  //       source: '/api/v3/:path*',
  //       destination: 'https://www.googleapis.com/youtube/v3/:path*',
  //     },
  //   ];
  // },
}

module.exports = nextConfig
