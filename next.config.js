const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Sources are at repository root (components/, lib/, app/):
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/app': path.resolve(__dirname, 'app'),
      '@/styles': path.resolve(__dirname, 'styles'),
      // If you later move to `src/`, these aliases can be switched to src/ paths.
    };
    return config;
  }
};

module.exports = nextConfig;
