import { getPopularMovies } from "@/lib/api/carousel"
import { toTrendingMovies } from "@/lib/trending-movies"
import { TrendingMovieCard } from "../movie-card/trending-movie-card"
import { MovieRow } from "./movie-row"

/**
 * "Trending Now" — the API's 20 most popular movies as poster cards. Render it
 * inside <Suspense> with `TrendingRowSkeleton`.
 */
export function TrendingRow() {
  return (
    <MovieRow
      variant="trending"
      load={getPopularMovies}
      toMovies={toTrendingMovies}
      renderCard={(movie) => <TrendingMovieCard movie={movie} />}
    />
  )
}
