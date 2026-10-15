import { connection } from 'next/server'

import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { movieGridClassName, movieGridItemClassName } from '@/components/movies/browse/browse-variants'
import { CatalogMovieCard } from '@/components/movies/browse/catalog-movie-card'
import type { Genre } from '@/data/genres'
import { getGenreTopTenMovies } from '@/lib/api/movies'
import { type RankedMovie, toTopTenMovies } from '@/lib/top-ten-movies'

type TopTenMoviesProps = {
  genre: Genre
}

/**
 * A genre's 10 most popular movies, read on the server, as ranked cards in
 * the catalog grid. Render it inside <Suspense> with `MovieGridSkeleton`.
 *
 * Not a `MovieGrid`: that client component exists to load more pages, and ten
 * fixed cards need no client JS. Like `GenreMovies`, `connection()` defers it
 * to request time so `next build` never calls the API, and the mapping runs
 * inside the `try` so a malformed item shows the message rather than failing
 * the page.
 */
export async function TopTenMovies({ genre }: TopTenMoviesProps) {
  await connection()

  let movies: RankedMovie[]
  try {
    movies = toTopTenMovies(await getGenreTopTenMovies(genre.id))
  } catch (error) {
    console.error(`Failed to load the top 10 ${genre.name} movies`, error)
    return <BrowseMessage>We couldn&apos;t load the top movies right now. Please try again later.</BrowseMessage>
  }

  if (movies.length === 0) {
    return <BrowseMessage>There are no {genre.name} movies to show yet.</BrowseMessage>
  }

  return (
    <ol className={movieGridClassName}>
      {movies.map((movie) => (
        <li key={movie.id} className={movieGridItemClassName}>
          <CatalogMovieCard movie={movie} rank={movie.rank} />
        </li>
      ))}
    </ol>
  )
}
