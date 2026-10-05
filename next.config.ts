import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  redirects() {
    return [
      {
        source: "/projects/ai-workflow-automation",
        destination: "/projects/strategy-navigator",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
