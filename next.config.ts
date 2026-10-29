import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    qualities: [50, 75, 100],
    remotePatterns: [new URL('https://image.tmdb.org/t/p/**')],
  },
}

export default function config(phase: string): NextConfig {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      images: {
        ...nextConfig.images,
        minimumCacheTTL: 60,
      },
    }
  }

  return nextConfig
}
