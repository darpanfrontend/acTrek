/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },};

export default nextConfig;
