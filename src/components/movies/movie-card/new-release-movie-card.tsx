import { MovieCardPoster } from '@/components/movies/movie-card/movie-card-poster'
import { ReleaseDateChip } from '@/components/movies/movie-card/release-date-chip'
import { movieCardStyles } from '@/components/movies/movie-variants'
import { Card } from '@/components/ui/card'
import type { NewRelease } from '@/lib/new-releases'

const styles = movieCardStyles['new-releases']

type NewReleaseMovieCardProps = {
  movie: NewRelease
}

/**
 * A "New Releases" card: the poster over its release-date pill.
 *
 * TODO: wrap it in a <Link> to the movie once the detail page exists (Figma's
 * "Movies Page Open"); linking now would only lead to a 404.
 */
export function NewReleaseMovieCard({ movie }: NewReleaseMovieCardProps) {
  return (
    <Card className={styles.card}>
      <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes={styles.sizes} className={styles.poster} />
      <ReleaseDateChip date={movie.releaseDate} label={movie.releasedOn} />
    </Card>
  )
}
