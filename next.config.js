/** @type {import('next').NextConfig} */
const nextConfig = {
  // Comentamos output: 'export' para permitir API routes
  // output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;