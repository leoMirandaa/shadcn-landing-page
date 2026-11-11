/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static: `next build` writes out/, then scripts/merge-old.mjs adds the
  // previous Vite site at out/old (served at ansora.io/old).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
