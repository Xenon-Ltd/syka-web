import type { NextConfig } from "next";

// Until the backend has its own HTTPS domain, browser calls go to /api/syka/*
// and Next proxies them server-side. Once it does, set
// NEXT_PUBLIC_SYKA_API_BASE_URL to the HTTPS URL and this rewrite goes unused.
const sykaApiUrl = process.env.SYKA_API_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  // No on-screen Next.js badge; build and runtime errors are still reported.
  devIndicators: false,
  async rewrites() {
    if (!sykaApiUrl) return [];
    return [{ source: "/api/syka/:path*", destination: `${sykaApiUrl}/api/v1/:path*` }];
  },
};

export default nextConfig;
