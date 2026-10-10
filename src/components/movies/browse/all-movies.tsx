import { connection } from 'next/server'

import type { MoviesPage } from '@/app/movies/all/actions'
import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { MovieGrid } from '@/components/movies/browse/movie-grid'
import { getMovies } from '@/lib/api/movies'
import { toCatalogMovies } from '@/lib/catalog-movies'
import { DEFAULT_MOVIE_SORT, type MovieFilters } from '@/lib/movie-filters'

type AllMoviesProps = {
  filters: MovieFilters
}

/**
 * The first page of the "All Movies" grid in the chosen sort and filter,
 * read on the server; `MovieGrid` loads the rest. Render it inside <Suspense>
 * with `MovieGridSkeleton`, keyed by the filters.
 *
 * Like `MovieRow`, `connection()` defers it to request time so `next build`
 * never calls the API, and the mapping runs inside the `try` so a malformed
 * item shows the message rather than failing the page.
 */
export async function AllMovies({ filters }: AllMoviesProps) {
  await connection()

  let page: MoviesPage
  try {
    const { items, nextCursor } = await getMovies(filters)
    page = { movies: toCatalogMovies(items), nextCursor }
  } catch (error) {
    console.error('Failed to load the movie catalog', error)
    return <BrowseMessage>We couldn&apos;t load the movies right now. Please try again later.</BrowseMessage>
  }

  if (page.movies.length === 0) {
    // Upcoming narrows the list as a filter does, and is often empty with one.
    const filtered = filters.rating !== null || filters.sort !== DEFAULT_MOVIE_SORT
    return (
      <BrowseMessage>
        {filtered ? 'No movies match these filters.' : 'There are no movies to show yet.'}
      </BrowseMessage>
    )
  }

  return <MovieGrid filters={filters} initialPage={page} />
}
