/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'res.cloudinary.com', 'task.com']
  },
  experimental: {
    serverComponentsExternalPackages: ['cloudinary', 'graphql-request']
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}

module.exports = nextConfig
