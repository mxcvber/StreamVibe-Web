import { GenreCarousel } from '@/components/genres/genre-carousel'
import { Container } from '@/components/shared/container'
import { SectionHeading } from '@/components/layout/section-heading'
import { genres } from '@/data/genres'

export function CategoriesSection() {
  return (
    <section id='categories'>
      <Container>
        <GenreCarousel
          genres={genres}
          heading={
            <SectionHeading
              className='flex-1'
              title='Explore our wide variety of categories'
              description="Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
            />
          }
        />
      </Container>
    </section>
  )
}
