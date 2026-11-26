import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Before regions existed, BC steps lived at /steps/<slug>.
    return [
      {
        source: "/steps/:slug",
        destination: "/bc/steps/:slug",
        permanent: true,
      },
      // The IP address guide was two steps before it became one page.
      {
        source: "/topics/ip-address/steps/:slug",
        destination: "/topics/ip-address",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
