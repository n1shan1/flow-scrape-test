/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Disable turbopack if causing issues
    turbo: false,
  },
  // Add webpack config for puppeteer if needed
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("puppeteer");
    }
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
