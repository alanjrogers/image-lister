import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
