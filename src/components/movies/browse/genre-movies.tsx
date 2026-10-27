import { connection } from 'next/server'

import { loadMoreGenreMovies } from '@/app/(pages)/movies/genres/[slug]/actions'
import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { MovieGrid } from '@/components/movies/browse/movie-grid'
import type { Genre } from '@/data/genres'
import { type MoviesPage, toMoviesPage } from '@/lib/catalog-movies'
import { getGenreMovies } from '@/lib/api/movies'

type GenreMoviesProps = {
  genre: Genre
}

/**
 * The first page of a genre's grid, newest first, read on the server;
 * `MovieGrid` loads the rest. Render it inside <Suspense> with
 * `MovieGridSkeleton`.
 *
 * Like `AllMovies`, `connection()` defers it to request time so `next build`
 * never calls the API, and the mapping runs inside the `try` so a malformed
 * item shows the message rather than failing the page.
 */
export async function GenreMovies({ genre }: GenreMoviesProps) {
  await connection()

  let page: MoviesPage
  try {
    page = toMoviesPage(await getGenreMovies(genre.id))
  } catch (error) {
    console.error(`Failed to load the ${genre.name} movies`, error)
    return <BrowseMessage>We couldn&apos;t load the movies right now. Please try again later.</BrowseMessage>
  }

  if (page.movies.length === 0) {
    return <BrowseMessage>There are no {genre.name} movies to show yet.</BrowseMessage>
  }

  return <MovieGrid initialPage={page} loadMoreAction={loadMoreGenreMovies.bind(null, genre.id)} />
}
