import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  experimental: {
  },
  async headers() {
    return [
      {
        source: "/destination/:path*",
        headers: [
          {
            key: "x-custom-header",
            value: "destination-route",
          },
        ],
      },
    ]
  },
  
};

export default nextConfig;
