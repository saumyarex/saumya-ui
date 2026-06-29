import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enable React's <ViewTransition> integration for animated route changes.
    viewTransition: true,
  },
};

export default nextConfig;
