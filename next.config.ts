import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Old company pages, from before the work was organized by craft.
    return [
      { source: "/work/futurestay", destination: "/#work", permanent: true },
      { source: "/work/scholar", destination: "/#work", permanent: true },
      { source: "/work/sqe", destination: "/#work", permanent: true },
      { source: "/work/verve", destination: "/work/verve-website", permanent: true },
    ];
  },
};

export default nextConfig;
