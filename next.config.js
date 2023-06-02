const { i18n } = require('./next-i18next.config');
const withTM = require('next-transpile-modules')(['@vime/core', '@vime/react']);
const beautifySlug = (slug) => {
  return slug.replace(/[^a-zA-Z0-9-_]/g, '');
}

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  i18n,
  env: {
    IMAGE_CDN_BASE_URL: process.env.IMAGE_CDN_BASE_URL,
    DOOSTREAM: process.env.DOOSTREAM,
    MIXDROP: process.env.MIXDROP,
    STREAMLARE: process.env.STREAMLARE,
    VOE: process.env.VOE
  },
  webpack(config, { isServer }) {


    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });


    return config;
  },
  // devIndicators: {
  //   buildActivity: true
  // },
  reactStrictMode: true,
  staticPageGenerationTimeout: 1000,
  trailingSlash: true,
  images: {
    
    domains: ['ik.imagekit.io', 'm.media-amazon.com'],
  }
})

module.exports = nextConfig
