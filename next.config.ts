import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/news/issue-0",
        destination: "/news/issue-1/",
        permanent: true,
      },
      {
        source: "/news/issue-0/:path*",
        destination: "/news/issue-1/:path*",
        permanent: true,
      },
      {
        source: "/news/issue-0.pdf",
        destination: "/news/issue-1.pdf",
        permanent: true,
      },
      {
        source: "/news/issue-0-thumb.png",
        destination: "/news/issue-1-thumb.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
