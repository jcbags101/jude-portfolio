import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  images: {
    // The screenshots are pre-sized WebP committed to the repo, so there is
    // nothing for the optimiser to do. Serving them directly skips the
    // on-demand /_next/image transform (which cost 1.7-3.3s on a cold cache)
    // and lets them go out as immutable static assets from the CDN.
    unoptimized: true,
  },
  // Pin the tracing root to this project so the presence of other lockfiles
  // higher up the tree doesn't confuse Next's workspace-root inference.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
