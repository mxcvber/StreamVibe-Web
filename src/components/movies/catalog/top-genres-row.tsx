import { connection } from 'next/server'

import { GenreCarousel } from '@/components/genres/genre-carousel'
import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'
import { CatalogRowMessage } from '@/components/movies/catalog/catalog-row-message'
import { getTopInGenres } from '@/lib/api/carousel'
import type { GenreTopMovies } from '@/lib/api/types'
import { toGenreCards } from '@/lib/top-genres'

const HEADING_ID = 'movies-top-genres-heading'
const TITLE = 'Popular Top 10 In Genres'

/**
 * "Popular Top 10 In Genres" — each genre's four most popular movies from the
 * API, on the wider "Top 10 In" cards. Render it inside <Suspense> with
 * `TopGenresRowSkeleton`.
 *
 * `connection()` defers the row to request time, so `next build` never calls
 * the API (a build without it running still passes) and a failed request is
 * never baked into the prerendered page. Requests are still served from
 * `getTopInGenres`'s hour-long cache.
 */
export async function TopGenresRow() {
  await connection()

  let items: GenreTopMovies[]
  try {
    items = await getTopInGenres()
  } catch (error) {
    console.error('Failed to load the top movies per genre', error)
    return (
      <CatalogRowMessage title={TITLE}>
        We couldn&apos;t load the top movies right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  // Empty until the API has imported movies, since cards need four posters.
  const genres = toGenreCards(items)
  if (genres.length === 0) {
    return <CatalogRowMessage title={TITLE}>There are no top movies to show yet.</CatalogRowMessage>
  }

  return (
    <GenreCarousel
      genres={genres}
      variant='top10'
      aria-labelledby={HEADING_ID}
      className='gap-5 lg:gap-10 2xl:gap-12.5'
      heading={
        // Keyed for the same reason as in GenresRow: it crosses into a client
        // component.
        <CatalogRowHeading key={HEADING_ID} id={HEADING_ID}>
          {TITLE}
        </CatalogRowHeading>
      }
    />
  )
}
