import { MovieRow } from '@/components/movies/catalog/movie-row'
import { MustWatchMovieCard } from '@/components/movies/movie-card/must-watch-movie-card'
import { getMustWatchMovies } from '@/lib/api/carousel'
import { toMustWatch } from '@/lib/must-watch'

/**
 * "Must - Watch Movies" — the API's 20 highest-rated movies as poster cards
 * with their runtime and star rating. Render it inside <Suspense> with
 * `MustWatchRowSkeleton`.
 */
export function MustWatchRow() {
  return (
    <MovieRow
      variant='must-watch'
      load={getMustWatchMovies}
      toMovies={toMustWatch}
      renderCard={(movie) => <MustWatchMovieCard movie={movie} />}
    />
  )
}
