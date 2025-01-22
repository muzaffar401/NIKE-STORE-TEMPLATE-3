/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["cdn.sanity.io"],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  transpilePackages: ["react-responsive-carousel"],
  reactStrictMode: true,
};

module.exports = nextConfig;
