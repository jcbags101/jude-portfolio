import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the tracing root to this project so the presence of other lockfiles
  // higher up the tree doesn't confuse Next's workspace-root inference.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
