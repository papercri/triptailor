import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  trailingSlash: false,
  async headers() {
    return [
      {
        source: '/destination/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  }
};

export default nextConfig;
