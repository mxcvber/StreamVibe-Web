import type { MustWatch } from "@/types/movie-carousel"
import { toMustWatch } from "@/lib/to-movies"
import { connection } from "next/server"
import { CatalogRowHeading } from "../catalog-row-heading"
import { getMustWatchMovies } from "@/api/carousel"
import { CatalogRowMessage } from "../catalog-row-message"
import { MustWatchCarousel } from "./must-watch-carousel"

const TITLE = "Must - Watch Movies"

/**
 * `connection()` defers the row to request time, so `next build` never calls
 * the API (a build without it running still passes) and a failed request is
 * never baked into the prerendered page.
 */
export async function MustWatchRow() {
  await connection()
  let mustWatchMovies: MustWatch[]

  try {
    mustWatchMovies = toMustWatch(await getMustWatchMovies())
  } catch (error) {
    console.error("Failed to load the must-watch movies", error)
    return (
      <CatalogRowMessage title={TITLE}>
        We couldn&apos;t load the must-watch movies right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  if (mustWatchMovies.length === 0) {
    return <CatalogRowMessage title={TITLE}>There are no must-watch movies to show yet.</CatalogRowMessage>
  }

  return (
    <MustWatchCarousel
      aria-labelledby="must-watch"
      className="gap-5 lg:gap-10 2xl:gap-12.5"
      items={mustWatchMovies}
      heading={<CatalogRowHeading id="must-watch">{TITLE}</CatalogRowHeading>}
    />
  )
}
