import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/fourg.dev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
