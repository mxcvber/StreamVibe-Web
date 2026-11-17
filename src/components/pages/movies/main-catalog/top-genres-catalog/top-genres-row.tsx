import type { Genre } from "@/data/genres"
import { connection } from "next/server"
import { CatalogRowHeading } from "../catalog-row-heading"
import { getTopInGenres } from "@/api/carousel"
import { CatalogRowMessage } from "../catalog-row-message"
import { TopGenresCarousel } from "./top-genres-carousel"
import { toGenreTopCards } from "@/lib/to-movies"

const TITLE = "Popular Top 10 In Genres"

/**
 * `connection()` defers the row to request time, so `next build` never calls
 * the API (a build without it running still passes) and a failed request is
 * never baked into the prerendered page.
 */
export async function TopGenresRow() {
  await connection()
  let genres: Genre[]

  try {
    genres = toGenreTopCards(await getTopInGenres())
  } catch (error) {
    console.error("Failed to load the top movies per genre", error)
    return (
      <CatalogRowMessage title={TITLE}>
        We couldn&apos;t load the top movies right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  if (genres.length === 0) {
    return <CatalogRowMessage title={TITLE}>There are no top movies to show yet.</CatalogRowMessage>
  }

  return (
    <TopGenresCarousel
      className="gap-5 lg:gap-10 2xl:gap-12.5"
      genres={genres}
      heading={<CatalogRowHeading>{TITLE}</CatalogRowHeading>}
    />
  )
}
