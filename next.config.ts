import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/fourg.dev",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
