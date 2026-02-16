import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprintwise-uploads-989635529126.s3.us-east-2.amazonaws.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
