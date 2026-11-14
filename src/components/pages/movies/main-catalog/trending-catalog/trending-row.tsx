import { connection } from "next/server"
import { CatalogRowHeading } from "../catalog-row-heading"
import { getPopularMovies } from "@/lib/api/carousel"
import { CatalogRowMessage } from "../catalog-row-message"
import { toTrendingMovies, TrendingMovie } from "@/lib/to-movies"
import { TrendingCarousel } from "./trending-carousel"

const TITLE = "Trending Now"

/**
 * `connection()` defers the row to request time, so `next build` never calls
 * the API (a build without it running still passes) and a failed request is
 * never baked into the prerendered page.
 */
export async function TrendingRow() {
  await connection()
  let trendingMovies: TrendingMovie[]

  try {
    trendingMovies = toTrendingMovies(await getPopularMovies())
  } catch (error) {
    console.error("Failed to load the trending movies", error)
    return (
      <CatalogRowMessage title={TITLE}>
        We couldn&apos;t load the trending movies right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  if (trendingMovies.length === 0) {
    return <CatalogRowMessage title={TITLE}>There are no trending movies to show yet.</CatalogRowMessage>
  }

  return (
    <TrendingCarousel
      aria-labelledby={"movies-trending-heading"}
      className="gap-5 lg:gap-10 2xl:gap-12.5"
      items={trendingMovies}
      heading={<CatalogRowHeading id="trending">{TITLE}</CatalogRowHeading>}
    />
  )
}
