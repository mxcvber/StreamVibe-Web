import type { MovieListItem, MovieListResponse } from '@/lib/api/types'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/** What a catalog grid card ("All Movies", a genre's page, its top 10) renders. */
export type CatalogMovie = {
  id: number
  title: string
  posterUrl: string
  /** 0–5 in halves: the 0–10 average rounded to a whole number, then halved. */
  stars: number
}

/** One page of a catalog grid, as `MovieGrid` renders and appends it. */
export type MoviesPage = {
  movies: CatalogMovie[]
  /** Pass back as `cursor` for the page after; null on the last page. */
  nextCursor: number | null
}

/**
 * Maps the API's movies to the grid cards' shape, keeping their order. Takes
 * only the fields a card reads, so catalog pages and top-10 lists both fit.
 */
export function toCatalogMovies(
  items: Pick<MovieListItem, 'id' | 'title' | 'posterPath' | 'voteAverage'>[],
): CatalogMovie[] {
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

/** Maps a `GET /movies` or `GET /movies/:id/genre` page to a grid page. */
export function toMoviesPage({ items, nextCursor }: MovieListResponse): MoviesPage {
  return { movies: toCatalogMovies(items), nextCursor }
}
