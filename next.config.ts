import type { NextConfig } from "next";

/**
 * Next.js Configuration for LinkQR AI - Final Stable Build
 */
const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  
  async headers() {
    const frameAncestors = [
      "'self'",
      "https://linkqr.in",
      "https://www.linkqr.in",
      "https://studio.firebase.google.com",
      "https://*.firebase.google.com",
      "https://*.cloudworkstations.dev",
      "https://*.firebaseapp.com",
      "https://*.web.app",
      "https://*.firebase-preview.app"
    ].join(' ');

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors ${frameAncestors}`,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          }
        ],
      },
    ];
  },
  
  experimental: {
    serverComponentsExternalPackages: ["@opentelemetry/sdk-node"],
  },
};

export default nextConfig;
