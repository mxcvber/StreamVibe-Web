import 'server-only'

import { cacheLife, cacheTag } from 'next/cache'

import { api } from '@/lib/api/client'
import type { GenreTopMovies, TopInGenresResponse } from '@/lib/api/types'

/**
 * Every genre with the posters of its four most popular movies. Popularity
 * only moves when the TMDB import runs, so an hour-long cache is plenty;
 * `revalidateTag('top-in-genres', 'max')` refreshes it on demand.
 *
 * Returns `data`, never the Axios response: cached values are serialized.
 */
export async function getTopInGenres(): Promise<GenreTopMovies[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('top-in-genres')

  const { data } = await api.get<TopInGenresResponse>('/carousel/top-in-genres')
  return data.items
}
