import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  // Data is cached per function with `'use cache'` + `cacheLife` + `cacheTag`
  // (see src/lib/api). This removes the `dynamic`, `revalidate` and
  // `fetchCache` segment exports.
  cacheComponents: true,
  images: {
    // Posters from the API are TMDB image paths, served from TMDB's CDN.
    remotePatterns: [new URL("https://image.tmdb.org/t/p/**")],
  },
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
