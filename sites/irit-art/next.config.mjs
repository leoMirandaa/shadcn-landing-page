// BASE_PATH is "/irit-art" while the site is mounted under ansora.io, and empty
// once it has its own domain. It is inlined at build time.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  // The ansora.io project uses trailingSlash: true; match it so the two never redirect-loop.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
