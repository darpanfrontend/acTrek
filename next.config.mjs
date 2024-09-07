/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Adjust this to your needs
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kanchenjunga-treks.com'
      },
    ],
  }
};

export default nextConfig;
