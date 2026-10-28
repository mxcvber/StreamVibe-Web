import { catalogMovieCardStyles as styles } from '@/components/movies/browse/browse-variants'
import { MovieCardLink } from '@/components/movies/movie-card/movie-card-link'
import { MovieCardPoster } from '@/components/movies/movie-card/movie-card-poster'
import { StarRating } from '@/components/movies/movie-card/star-rating'
import { cardBox } from '@/components/movies/movie-variants'
import { Card } from '@/components/shared/ui/card'
import type { CatalogMovie } from '@/lib/catalog-movies'

type CatalogMovieCardProps = {
  movie: CatalogMovie
  /** The movie's place in a top-10 list, shown as a "#1" badge on the poster. */
  rank?: number
}

/**
 * An "All Movies" grid card: the poster over the title and a five-star
 * rating, read out as "Rated 4.5 out of 5". The title is clamped to one line,
 * with the full title in its tooltip. On a top-10 page the poster carries the
 * movie's rank, read out as "Rank #1" before the title.
 *
 * The card leads to the movie's page.
 *
 * No `'use client'`: the client `MovieGrid` imports it, and it holds no state.
 */
export function CatalogMovieCard({ movie, rank }: CatalogMovieCardProps) {
  return (
    <MovieCardLink id={movie.id}>
      <Card className={cardBox}>
        {/* No alt: the title below already names the link, and the poster's
            alt would read it out twice. */}
        <MovieCardPoster src={movie.posterUrl} alt='' sizes={styles.sizes} className={styles.poster}>
          {rank !== undefined && (
            <p className={styles.rank}>
              <span className='sr-only'>Rank </span>#{rank}
            </p>
          )}
        </MovieCardPoster>
        <div className='flex flex-col gap-1.5 lg:gap-2'>
          <h3 title={movie.title} className={styles.title}>
            {movie.title}
          </h3>
          <p className='flex'>
            <span className='sr-only'>Rated {movie.stars} out of 5</span>
            <StarRating value={movie.stars} />
          </p>
        </div>
      </Card>
    </MovieCardLink>
  )
}
