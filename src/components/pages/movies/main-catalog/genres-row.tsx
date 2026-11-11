import { GenreCarousel } from "@/components/shared/genre-carousel/genre-carousel"
import { genres } from "@/data/genres"
import { CatalogRowHeading } from "./catalog-row-heading"

const HEADING_ID = "genres"

export function GenresRow() {
  return (
    <GenreCarousel
      genres={genres}
      aria-labelledby={HEADING_ID}
      className="gap-5 lg:gap-10 2xl:gap-12.5"
      heading={<CatalogRowHeading id={HEADING_ID}>Our Genres</CatalogRowHeading>}
    />
  )
}
