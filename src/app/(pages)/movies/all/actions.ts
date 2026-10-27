'use server'

import { getMovies } from '@/lib/api/movies'
import { type MoviesPage, toMoviesPage } from '@/lib/catalog-movies'
import { type MovieFilters, isMovieFilters } from '@/lib/movie-filters'

/**
 * The page of the "All Movies" grid after `cursor`, in the same sort and
 * rating filter as the pages before it, for its "Load more" button. A Server
 * Action rather than a browser request because `API_URL` is server-only;
 * pages still come from `getMovies`'s cache. `AllMovies` hands it to
 * `MovieGrid` bound to the filters.
 *
 * Anyone can POST to an action, so the arguments are checked here rather than
 * trusted. Errors are thrown for the grid to catch and show inline.
 */
export async function loadMoreMovies(filters: MovieFilters, cursor: number): Promise<MoviesPage> {
  if (!isMovieFilters(filters)) {
    throw new Error('Invalid movie filters')
  }
  if (!Number.isSafeInteger(cursor) || cursor < 1) {
    throw new Error(`Invalid movies cursor: ${cursor}`)
  }

  return toMoviesPage(await getMovies({ sort: filters.sort, rating: filters.rating, cursor }))
}
