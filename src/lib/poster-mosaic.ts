import { type MosaicReveal, type PosterSrc } from '@/types/poster-mosaic'

export function poster(n: number): PosterSrc {
  return `/images/posters/poster-${String(n).padStart(2, '0')}.webp`
}

export const posterMosaic = (rows: number, columns: number): PosterSrc[][] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, col) => poster(row * columns + col + 1)),
  )
}

export function mosaicRevealAt(index: number, baseCount: number, lgCount: number): MosaicReveal | undefined {
  if (index < baseCount) return undefined
  return index < lgCount ? 'lg' : '2xl'
}
