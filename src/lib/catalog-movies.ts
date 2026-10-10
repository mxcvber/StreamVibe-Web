import type { MovieListItem } from '@/lib/api/types'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/** What an "All Movies" grid card renders. */
export type CatalogMovie = {
  id: number
  title: string
  posterUrl: string
  /** 0–5 in halves: the 0–10 average rounded to a whole number, then halved. */
  stars: number
}

/** Maps a page of the API's catalog to the grid cards' shape, keeping its order. */
export function toCatalogMovies(items: MovieListItem[]): CatalogMovie[] {
  return items.map(({ id, title, posterPath, voteAverage }) => ({
    id,
    title,
    // 276px at most (four columns just under 1536px), so 552px at 2×: w500
    // falls short.
    posterUrl: tmdbPosterUrl(posterPath, 'w780'),
    // Like `toMustWatch`: Figma draws only full, half and empty stars.
    stars: Math.round(voteAverage) / 2,
  }))
}
