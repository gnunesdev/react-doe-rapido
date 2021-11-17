/** @type {import('next').NextConfig} */

const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  esModule: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
});
