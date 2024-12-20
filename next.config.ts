import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "woocommerce-1385401-5127072.cloudwaysapps.com"
      }
    ]
  }
};

export default nextConfig;
