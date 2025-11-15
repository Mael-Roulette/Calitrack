import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'calitrack.appwrite.network',
          },
        ],
        destination: 'https://calitrack.fr/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;