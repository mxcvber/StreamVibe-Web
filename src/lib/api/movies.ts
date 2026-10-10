import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { api } from '@/lib/api/client'
import type { MovieListResponse } from '@/lib/api/types'
import type { MovieFilters } from '@/lib/movie-filters'

type GetMoviesOptions = MovieFilters & {
  /** The previous page's `nextCursor`; omit it for the first page. */
  cursor?: number
}

/**
 * One page of the whole catalog in `sort` order, optionally narrowed to one
 * star rating, for the "All Movies" grid. The options are part of the cache
 * key, so every sort, filter and page is cached on its own. Ratings and
 * popularity only move when the TMDB import runs, so an hour-long cache is
 * plenty; `revalidateTag('movies', 'max')` refreshes every page.
 *
 * Returns the whole `data` rather than `data.items`: the grid needs
 * `nextCursor` to load the next page.
 */
export async function getMovies({ sort, rating, cursor }: GetMoviesOptions): Promise<MovieListResponse> {
  'use cache'
  cacheLife('hours')
  cacheTag('movies')

  const { data } = await api.get<MovieListResponse>('/movies', {
    params: { sort, rating: rating ?? undefined, cursor },
  })
  return data
}
