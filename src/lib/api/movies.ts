import 'server-only'

import { isAxiosError } from 'axios'
import { cacheLife, cacheTag } from 'next/cache'

import { api } from '@/lib/api/client'
import type { MovieDetail, MovieListResponse, TopTenMovie, TopTenMoviesResponse } from '@/lib/api/types'
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

  const { data } = await api.get<MovieListResponse>(`/movies/${genreId}/genre`, {
    params: { cursor },
  })
  return data
}

/**
 * A genre's 10 most popular movies, most popular first, for its top-10 page.
 * `genreId` is the TMDB genre id and part of the cache key, so every genre is
 * cached on its own. Popularity only moves when the TMDB import runs, so an
 * hour-long cache is plenty; `revalidateTag('genre-top-10', 'max')` refreshes
 * every genre.
 *
 * Returns `data.items`, like the carousel functions: the list has no pages.
 */
export async function getGenreTopTenMovies(genreId: number): Promise<TopTenMovie[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('genre-top-10')

  const { data } = await api.get<TopTenMoviesResponse>(`/movies/${genreId}/genre/top-10`)
  return data.items
}

/**
 * One movie's page data, everything but its reviews. `id` is the TMDB movie
 * id and part of the cache key, so every movie is cached on its own. The data
 * only changes when the TMDB import runs, so an hour-long cache is plenty;
 * `revalidateTag('movie-detail', 'max')` refreshes every movie.
 *
 * Returns null when the API has no such movie (404), so the page can call
 * `notFound()` outside its error handling. The null is cached like a movie:
 * an unknown id stays unknown until the next import. Any other failure throws.
 */
export async function getMovie(id: number): Promise<MovieDetail | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('movie-detail')

  try {
    const { data } = await api.get<MovieDetail>(`/movies/${id}`)
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null
    throw error
  }
}
