import { Suspense } from 'react'

import { Container } from '@/components/shared/container'
import { CatalogBox } from '@/components/movies/catalog/catalog-box'
import { GenresRow } from '@/components/movies/catalog/genres-row'
import { MustWatchRow } from '@/components/movies/catalog/must-watch-row'
import { MustWatchRowSkeleton } from '@/components/movies/catalog/must-watch-row-skeleton'
import { NewReleasesRow } from '@/components/movies/catalog/new-releases-row'
import { NewReleasesRowSkeleton } from '@/components/movies/catalog/new-releases-row-skeleton'
import { TopGenresRow } from '@/components/movies/catalog/top-genres-row'
import { TopGenresRowSkeleton } from '@/components/movies/catalog/top-genres-row-skeleton'
import { TrendingRow } from '@/components/movies/catalog/trending-row'
import { TrendingRowSkeleton } from '@/components/movies/catalog/trending-row-skeleton'

/**
 * The browsable rows under the Movies hero, framed by `CatalogBox`. The
 * artboards leave 80px (mobile), 100px (laptop) and 180px (desktop) between
 * the hero and the box's label, which links to the full catalog.
 */
export function MoviesCatalog() {
  return (
    <section aria-label='Movies' className='mt-20 lg:mt-25 2xl:mt-45'>
      <Container>
        <CatalogBox label='Movies' href='/movies/all'>
          <GenresRow />
          <Suspense fallback={<TopGenresRowSkeleton />}>
            <TopGenresRow />
          </Suspense>
          <Suspense fallback={<TrendingRowSkeleton />}>
            <TrendingRow />
          </Suspense>
          <Suspense fallback={<NewReleasesRowSkeleton />}>
            <NewReleasesRow />
          </Suspense>
          <Suspense fallback={<MustWatchRowSkeleton />}>
            <MustWatchRow />
          </Suspense>
        </CatalogBox>
      </Container>
    </section>
  )
}
