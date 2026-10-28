import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/work/trialist-bootcamp", destination: "/work/futurestay#trialist-bootcamp", permanent: true },
    ];
  },
};

export default nextConfig;
