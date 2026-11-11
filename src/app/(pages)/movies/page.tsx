import { MoviesHero } from "@/components/pages/movies/hero/movies-hero"
import { MainCatalog } from "@/components/pages/movies/main-catalog/movies-catalog"
import { Fragment } from "react"

export default function MoviesPage() {
  return (
    <Fragment>
      <h1 className="sr-only">Movies</h1>

      <MoviesHero />
      <MainCatalog />
    </Fragment>
  )
}
