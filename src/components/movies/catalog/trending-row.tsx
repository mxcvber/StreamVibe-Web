import { MovieRow } from '@/components/movies/catalog/movie-row'
import { TrendingMovieCard } from '@/components/movies/movie-card/trending-movie-card'
import { getPopularMovies } from '@/lib/api/carousel'
import { toTrendingMovies } from '@/lib/trending-movies'

/**
 * "Trending Now" — the API's 20 most popular movies as poster cards. Render it
 * inside <Suspense> with `TrendingRowSkeleton`.
 */
export function TrendingRow() {
  return (
    <MovieRow
      variant='trending'
      load={getPopularMovies}
      toMovies={toTrendingMovies}
      renderCard={(movie) => <TrendingMovieCard movie={movie} />}
    />
  )
}
