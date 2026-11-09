import { Suspense } from "react"

import { Container } from "@/components/shared/container"
import { CatalogBox } from "./catalog-box"
import { GenresRow } from "./genres-row"
import { TopGenresRowSkeleton } from "./top-genres-row-skeleton"
import { TopGenresRow } from "./top-genres-row"
import { TrendingRowSkeleton } from "./trending-row-skeleton"
import { TrendingRow } from "./trending-row"
import { NewReleasesRowSkeleton } from "./new-releases-row-skeleton"
import { NewReleasesRow } from "./new-releases-row"
import { MustWatchRowSkeleton } from "./must-watch-row-skeleton"
import { MustWatchRow } from "./must-watch-row"

/**
 * The browsable rows under the Movies hero, framed by `CatalogBox`. The
 * artboards leave 80px (mobile), 100px (laptop) and 180px (desktop) between
 * the hero and the box's label, which links to the full catalog.
 */
export function MoviesCatalog() {
  return (
    <section aria-label="Movies" className="mt-20 lg:mt-25 2xl:mt-45">
      <Container>
        <CatalogBox label="Movies" href="/movies/all">
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
