import { catalogMovieCardStyles as styles } from '@/components/movies/browse/browse-variants'
import { MovieCardPoster } from '@/components/movies/movie-card/movie-card-poster'
import { StarRating } from '@/components/movies/movie-card/star-rating'
import { cardBox } from '@/components/movies/movie-variants'
import { Card } from '@/components/ui/card'
import type { CatalogMovie } from '@/lib/catalog-movies'

type CatalogMovieCardProps = {
  movie: CatalogMovie
}

/**
 * An "All Movies" grid card: the poster over the title and a five-star
 * rating, read out as "Rated 4.5 out of 5". The title is clamped to one line,
 * with the full title in its tooltip.
 *
 * No `'use client'`: the client `MovieGrid` imports it, and it holds no state.
 *
 * TODO: wrap it in a <Link> to the movie once the detail page exists, like
 * the row cards.
 */
export function CatalogMovieCard({ movie }: CatalogMovieCardProps) {
  return (
    <Card className={cardBox}>
      <MovieCardPoster src={movie.posterUrl} alt={movie.title} sizes={styles.sizes} className={styles.poster} />
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
  )
}
