import { MoviesCatalog } from "@/components/pages/movies/catalog/movies-catalog"
import { MoviesHero } from "@/components/pages/movies/hero/movies-hero"
import { Fragment } from "react"

export default function MoviesPage() {
  return (
    <Fragment>
      <h1 className="sr-only">Movies</h1>

      <MoviesHero />
      <MoviesCatalog />
    </Fragment>
  )
}
