import { Container } from '@/components/layout/container'
import { CatalogBox } from '@/components/movies/catalog/catalog-box'
import { GenresRow } from '@/components/movies/catalog/genres-row'

/**
 * The browsable rows under the Movies hero, framed by `CatalogBox`. The
 * artboards leave 80px (mobile), 100px (laptop) and 180px (desktop) between
 * the hero and the box's label.
 */
export function MoviesCatalog() {
  return (
    <section aria-label='Movies' className='mt-20 lg:mt-25 2xl:mt-45'>
      <Container>
        <CatalogBox label='Movies'>
          <GenresRow />
        </CatalogBox>
      </Container>
    </section>
  )
}
