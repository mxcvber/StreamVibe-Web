import { ClockIcon } from '@/components/icons/clock'
import { MovieCardLink } from '@/components/movies/movie-card/movie-card-link'
import { MovieCardPoster } from '@/components/movies/movie-card/movie-card-poster'
import { MovieChip } from '@/components/movies/movie-card/movie-chip'
import { RatingChip } from '@/components/movies/movie-card/rating-chip'
import { movieCardStyles, mustWatchRuntimeChip } from '@/components/movies/movie-variants'
import { Card } from '@/components/ui/card'
import type { MustWatch } from '@/lib/must-watch'

const styles = movieCardStyles['must-watch']

type MustWatchMovieCardProps = {
  movie: MustWatch
}

/**
 * A "Must - Watch Movies" card: the poster over runtime and rating chips at
 * opposite edges, the runtime chip losing its icon on cards too narrow for
 * both. Leads to the movie's page.
 */
export function MustWatchMovieCard({ movie }: MustWatchMovieCardProps) {
  return (
    <MovieCardLink id={movie.id}>
      <Card className={styles.card}>
        <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes={styles.sizes} className={styles.poster} />
        {/* gap-0.5 is only the minimum: the chips sit at opposite edges. */}
        <div className='flex items-center gap-0.5'>
          {movie.runtime && (
            <MovieChip icon={<ClockIcon />} srLabel='Runtime' className={mustWatchRuntimeChip}>
              {movie.runtime}
            </MovieChip>
          )}
          {/* ml-auto keeps it right-aligned when there is no runtime chip. */}
          <RatingChip stars={movie.stars} votes={movie.votes} className='ml-auto' />
        </div>
      </Card>
    </MovieCardLink>
  )
}
