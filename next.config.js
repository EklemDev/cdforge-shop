/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // ⚠️ Ignorar erros de TypeScript durante o build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Ignorar erros de ESLint durante o build
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://codeforge.dev'
  }
}

module.exports = nextConfig
