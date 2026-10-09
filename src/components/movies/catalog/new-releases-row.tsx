import { MovieRow } from '@/components/movies/catalog/movie-row'
import { NewReleaseMovieCard } from '@/components/movies/movie-card/new-release-movie-card'
import { getNewReleases } from '@/lib/api/carousel'
import { toNewReleases } from '@/lib/new-releases'

/**
 * "New Releases" — the API's 20 newest released movies as poster cards with
 * their release dates. Render it inside <Suspense> with
 * `NewReleasesRowSkeleton`.
 */
export function NewReleasesRow() {
  return (
    <MovieRow
      variant='new-releases'
      load={getNewReleases}
      toMovies={toNewReleases}
      renderCard={(movie) => <NewReleaseMovieCard movie={movie} />}
    />
  )
}
