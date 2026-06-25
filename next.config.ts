import type { NextConfig } from 'next';

const repositoryName = 'Portfolio-Website';
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
const basePath = isGitHubPages ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: isGitHubPages ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
