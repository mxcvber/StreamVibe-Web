import { Card } from "@/components/shared/ui/card"
import type { NewRelease } from "@/lib/new-releases"
import { movieCardStyles } from "../movie-variants"
import { MovieCardLink } from "./movie-card-link"
import { MovieCardPoster } from "./movie-card-poster"
import { ReleaseDateChip } from "./release-date-chip"

const styles = movieCardStyles["new-releases"]

type NewReleaseMovieCardProps = {
  movie: NewRelease
}

/** A "New Releases" card: the poster over its release-date pill. Leads to the movie's page. */
export function NewReleaseMovieCard({ movie }: NewReleaseMovieCardProps) {
  return (
    <MovieCardLink id={movie.id}>
      <Card className={styles.card}>
        <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes={styles.sizes} className={styles.poster} />
        <ReleaseDateChip date={movie.releaseDate} label={movie.releasedOn} />
      </Card>
    </MovieCardLink>
  )
}
