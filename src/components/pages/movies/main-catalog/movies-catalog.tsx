import { Suspense } from "react"
import { Container } from "@/components/shared/container"
import { CatalogBox } from "../../../shared/catalog-box"
import { TrendingRowSkeleton } from "../catalog/trending-row-skeleton"
import { TrendingRow } from "../catalog/trending-row"
import { NewReleasesRowSkeleton } from "../catalog/new-releases-row-skeleton"
import { NewReleasesRow } from "../catalog/new-releases-row"
import { MustWatchRowSkeleton } from "../catalog/must-watch-row-skeleton"
import { MustWatchRow } from "../catalog/must-watch-row"
import { GenresRow } from "./genres-row"
import { TopGenresRowSkeleton } from "./top-genres-catalog/top-genres-row-skeleton"
import { TopGenresRow } from "./top-genres-catalog/top-genres-row"

export function MainCatalog() {
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
