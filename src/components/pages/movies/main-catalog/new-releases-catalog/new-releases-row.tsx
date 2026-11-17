import { connection } from "next/server"
import { CatalogRowHeading } from "../catalog-row-heading"
import { getNewReleases } from "@/api/carousel"
import { CatalogRowMessage } from "../catalog-row-message"
import { type NewRelease, toNewReleases } from "@/lib/to-movies"
import { NewReleasesCarousel } from "./new-releases-carousel"

const TITLE = "New Releases"

/**
 * `connection()` defers the row to request time, so `next build` never calls
 * the API (a build without it running still passes) and a failed request is
 * never baked into the prerendered page.
 */
export async function NewReleasesRow() {
  await connection()
  let newReleases: NewRelease[]

  try {
    newReleases = toNewReleases(await getNewReleases())
  } catch (error) {
    console.error("Failed to load the new release movies", error)
    return (
      <CatalogRowMessage title={TITLE}>
        We couldn&apos;t load the new release movies right now. Please try again later.
      </CatalogRowMessage>
    )
  }

  if (newReleases.length === 0) {
    return <CatalogRowMessage title={TITLE}>There are no new release movies to show yet.</CatalogRowMessage>
  }

  return (
    <NewReleasesCarousel
      aria-labelledby="new-releases"
      className="gap-5 lg:gap-10 2xl:gap-12.5"
      items={newReleases}
      heading={<CatalogRowHeading id="new-releases">{TITLE}</CatalogRowHeading>}
    />
  )
}
