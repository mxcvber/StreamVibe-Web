import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { api } from '@/lib/api/client'
import type { MovieListResponse } from '@/lib/api/types'

/**
 * One page of a genre's released movies, newest first, for its genre page.
 * `genreId` is the TMDB genre id; it and `cursor` (the previous page's
 * `nextCursor`, omitted for the first page) are part of the cache key, so
 * every genre and page is cached on its own.
 *
 * The API decides "today" per request, so like `getNewReleases` a movie joins
 * the list within an hour of its release date;
 * `revalidateTag('genre-movies', 'max')` refreshes every genre sooner.
 *
 * Returns the whole `data` rather than `data.items`: the grid needs
 * `nextCursor` to load the next page.
 */
export async function getGenreMovies(genreId: number, cursor?: number): Promise<MovieListResponse> {
  'use cache'
  cacheLife('hours')
  cacheTag('genre-movies')

  const { data } = await api.get<MovieListResponse>(`/genres/${genreId}/movies`, {
    params: { cursor },
  })
  return data
}
