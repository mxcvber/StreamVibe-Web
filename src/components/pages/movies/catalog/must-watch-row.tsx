import { getMustWatchMovies } from "@/lib/api/carousel"
import { toMustWatch } from "@/lib/must-watch"
import { MovieRow } from "./movie-row"
import { MustWatchMovieCard } from "../movie-card/must-watch-movie-card"

/**
 * "Must - Watch Movies" — the API's 20 highest-rated movies as poster cards
 * with their runtime and star rating. Render it inside <Suspense> with
 * `MustWatchRowSkeleton`.
 */
export function MustWatchRow() {
  return (
    <MovieRow
      variant="must-watch"
      load={getMustWatchMovies}
      toMovies={toMustWatch}
      renderCard={(movie) => <MustWatchMovieCard movie={movie} />}
    />
  )
}
