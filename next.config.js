/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Remove basePath if using custom domain; add '/repo-name' if using engguga.github.io/repo
};

module.exports = nextConfig;
