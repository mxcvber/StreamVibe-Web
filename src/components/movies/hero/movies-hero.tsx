import { Container } from '@/components/layout/container'
import { HeroCarousel } from '@/components/movies/hero/hero-carousel'
import { featuredMovies } from '@/data/movies'

/**
 * The Movies page opens with a featured-movie poster carousel inside the page
 * container. The artboards put the poster's top edge 142px (mobile), 138px
 * (laptop) and 170px (desktop) below the page top — the header's height plus
 * a 40/40/50px gap — and since `SiteHeader` floats absolutely, the section
 * reserves that as top padding.
 */
export function MoviesHero() {
  return (
    <section className='pt-32 lg:pt-34.5 2xl:pt-42.5'>
      <Container>
        <HeroCarousel movies={featuredMovies} />
      </Container>
    </section>
  )
}
