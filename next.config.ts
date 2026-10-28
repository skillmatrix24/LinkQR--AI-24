
import type { NextConfig } from "next";

/**
 * Next.js Configuration for LinkQR AI
 */
const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  experimental: {
    serverComponentsExternalPackages: ["@opentelemetry/sdk-node"],
  },
};

export default nextConfig;
