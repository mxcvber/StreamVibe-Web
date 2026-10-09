import { GenreCarousel } from '@/components/genres/genre-carousel'
import { genres } from '@/data/genres'

const HEADING_ID = 'movies-genres-heading'

/**
 * "Our Genres" — the home page's genre cards under a title-only heading, which
 * centres against the controls and sits closer to the cards (20/40/50px) than
 * a home section heading does.
 */
export function GenresRow() {
  return (
    <GenreCarousel
      genres={genres}
      aria-labelledby={HEADING_ID}
      className='gap-5 lg:gap-10 2xl:gap-12.5'
      heading={
        // The key looks redundant but isn't: this element crosses from a Server
        // Component into the client GenreCarousel, and React warns without it.
        <h2 key={HEADING_ID} id={HEADING_ID} className='flex-1 text-24 font-bold lg:self-center lg:text-30 2xl:text-38'>
          Our Genres
        </h2>
      }
    />
  )
}
