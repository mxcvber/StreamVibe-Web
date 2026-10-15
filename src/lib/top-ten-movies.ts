import type { TopTenMovie } from '@/lib/api/types'
import { type CatalogMovie, toCatalogMovies } from '@/lib/catalog-movies'

/** A top-10 grid card: a catalog card with its place in the list. */
export type RankedMovie = CatalogMovie & {
  /** 1 for the most popular. */
  rank: number
}

/** Maps a genre's top 10 to ranked grid cards. The API's order is the ranking. */
export function toTopTenMovies(items: TopTenMovie[]): RankedMovie[] {
  return toCatalogMovies(items).map((movie, index) => ({ ...movie, rank: index + 1 }))
}
