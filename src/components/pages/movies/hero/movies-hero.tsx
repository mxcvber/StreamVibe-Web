import { Container } from "@/components/shared/container"
import { featuredMovies } from "@/data/movies-hero"
import { HeroCarousel } from "./hero-carousel"

export function MoviesHero() {
  return (
    <section className="pt-32 lg:pt-34.5 2xl:pt-42.5">
      <Container>
        <HeroCarousel movies={featuredMovies} />
      </Container>
    </section>
  )
}
