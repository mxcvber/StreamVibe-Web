import { ClockIcon } from '@/components/icons/clock'
import { EyeIcon } from '@/components/icons/eye'
import { MovieCardLink } from '@/components/movies/movie-card/movie-card-link'
import { MovieCardPoster } from '@/components/movies/movie-card/movie-card-poster'
import { MovieChip } from '@/components/movies/movie-card/movie-chip'
import { movieCardStyles, trendingChipCompact } from '@/components/movies/movie-variants'
import { Card } from '@/components/shared/ui/card'
import type { TrendingMovie } from '@/lib/trending-movies'
import { cn } from '@/lib/utils'

const styles = movieCardStyles.trending

type TrendingMovieCardProps = {
  movie: TrendingMovie
}

/**
 * A "Trending Now" card: the poster over runtime and view-count chips at
 * opposite edges, compacted on cards too narrow for both. Leads to the
 * movie's page.
 */
export function TrendingMovieCard({ movie }: TrendingMovieCardProps) {
  return (
    <MovieCardLink id={movie.id}>
      <Card className={styles.card}>
        <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes={styles.sizes} className={styles.poster} />
        {/* gap-1 is only the minimum: the chips sit at opposite edges. */}
        <div className='flex items-center gap-1'>
          {movie.runtime && (
            <MovieChip icon={<ClockIcon />} srLabel='Runtime' className={trendingChipCompact.chip}>
              <span className={trendingChipCompact.full}>{movie.runtime.long}</span>
              <span className={trendingChipCompact.short}>{movie.runtime.short}</span>
            </MovieChip>
          )}
          {movie.views && (
            // ml-auto keeps it right-aligned when there is no runtime chip.
            <MovieChip icon={<EyeIcon />} srLabel='Views' className={cn('ml-auto', trendingChipCompact.chip)}>
              {movie.views}
            </MovieChip>
          )}
        </div>
      </Card>
    </MovieCardLink>
  )
}
