import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  /* config options here */
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      images: {
        ...nextConfig.images,
        // Optimised images are cached on disk (.next/dev/cache/images) keyed
        // by URL only, never by file contents, for `minimumCacheTTL` — 4h
        // since Next 16. While backdrops and posters are hand-swapped
        // placeholders, keep the dev window at the pre-16 60s so a replaced
        // file shows up after a reload or two. Production keeps the default.
        minimumCacheTTL: 60,
      },
    };
  }

  return nextConfig;
}
