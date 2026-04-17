/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/msdkx",
  assetPrefix: "/msdkx/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
