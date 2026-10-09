import { connection } from 'next/server'
import type { ReactNode } from 'react'

import { RowCarousel } from '@/components/carousel/row-carousel'
import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'
import { CatalogRowMessage } from '@/components/movies/catalog/catalog-row-message'
import {
  type MovieCardVariant,
  movieCarouselOptions,
  movieRowCopy,
  movieSlideClassName,
  movieTrackClassName,
} from '@/components/movies/movie-variants'
import { CarouselItem } from '@/components/ui/carousel'

type MovieRowProps<TItem, TMovie extends { id: number }> = {
  variant: MovieCardVariant
  /** The cached data function, e.g. `getPopularMovies`. */
  load: () => Promise<TItem[]>
  /** Maps the API items to the cards' shape, e.g. `toTrendingMovies`. */
  toMovies: (items: TItem[]) => TMovie[]
  renderCard: (movie: TMovie) => ReactNode
}

/**
 * A row of movie cards read from the API: the heading and controls over a
 * carousel, or the heading over an inline message when the request fails or
 * returns nothing. Render it inside <Suspense> with the variant's skeleton.
 *
 * Like `TopGenresRow`, `connection()` defers it to request time so `next build`
 * never calls the API; requests are still served from `load`'s cache. The
 * mapping runs inside the `try` too, so one malformed item shows the message
 * rather than failing the page.
 *
 * The function props are fine because this is a server component that calls
 * them itself: only the rendered cards cross into the client `RowCarousel`.
 * Don't pass `renderCard` or `toMovies` on to a client component.
 */
export async function MovieRow<TItem, TMovie extends { id: number }>({
  variant,
  load,
  toMovies,
  renderCard,
}: MovieRowProps<TItem, TMovie>) {
  await connection()

  const { title, headingId, noun } = movieRowCopy[variant]

  let movies: TMovie[]
  try {
    movies = toMovies(await load())
  } catch (error) {
    console.error(`Failed to load the ${noun}`, error)
    return (
      <CatalogRowMessage title={title}>
        We couldn&apos;t load the {noun} right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  // Empty until the API has imported movies.
  if (movies.length === 0) {
    return <CatalogRowMessage title={title}>There are no {noun} to show yet.</CatalogRowMessage>
  }

  return (
    <RowCarousel
      opts={movieCarouselOptions[variant]}
      contentClassName={movieTrackClassName[variant]}
      aria-labelledby={headingId}
      className='gap-5 lg:gap-10 2xl:gap-12.5'
      heading={
        // Keyed for the same reason as in GenresRow: it crosses into a client
        // component.
        <CatalogRowHeading key={headingId} id={headingId}>
          {title}
        </CatalogRowHeading>
      }
    >
      {movies.map((movie) => (
        <CarouselItem key={movie.id} className={movieSlideClassName[variant]}>
          {renderCard(movie)}
        </CarouselItem>
      ))}
    </RowCarousel>
  )
}
