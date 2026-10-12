'use server'

import { genres } from '@/data/genres'
import { getGenreMovies } from '@/lib/api/genres'
import { type MoviesPage, toMoviesPage } from '@/lib/catalog-movies'

/**
 * The page of a genre's grid after `cursor`, for its "Load more" button. A
 * Server Action for the same reason as `loadMoreMovies`; `GenreMovies` hands
 * it to `MovieGrid` bound to the genre id.
 *
 * Anyone can POST to an action, so the arguments are checked here rather than
 * trusted: the id must be one of the known genres, not just any integer.
 * Errors are thrown for the grid to catch and show inline.
 */
export async function loadMoreGenreMovies(genreId: number, cursor: number): Promise<MoviesPage> {
  if (!genres.some((genre) => genre.id === genreId)) {
    throw new Error(`Invalid genre id: ${genreId}`)
  }
  if (!Number.isSafeInteger(cursor) || cursor < 1) {
    throw new Error(`Invalid movies cursor: ${cursor}`)
  }

  return toMoviesPage(await getGenreMovies(genreId, cursor))
}
