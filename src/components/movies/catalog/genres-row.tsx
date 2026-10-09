import { GenreCarousel } from '@/components/genres/genre-carousel'
import { CatalogRowHeading } from '@/components/movies/catalog/catalog-row-heading'
import { genres } from '@/data/genres'

const HEADING_ID = 'movies-genres-heading'

/** "Our Genres" — the home page's genre cards under a title-only heading. */
export function GenresRow() {
  return (
    <GenreCarousel
      genres={genres}
      aria-labelledby={HEADING_ID}
      className='gap-5 lg:gap-10 2xl:gap-12.5'
      heading={
        // The key looks redundant but isn't: this element crosses from a Server
        // Component into the client RowCarousel, and React warns without it.
        <CatalogRowHeading key={HEADING_ID} id={HEADING_ID}>
          Our Genres
        </CatalogRowHeading>
      }
    />
  )
}
