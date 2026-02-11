import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sharptech-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
