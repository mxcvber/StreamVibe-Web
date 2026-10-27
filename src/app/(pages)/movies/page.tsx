import { MoviesCatalog } from '@/components/movies/catalog/movies-catalog'
import { MoviesHero } from '@/components/movies/hero/movies-hero'

export default function MoviesPage() {
  return (
    <>
      <h1 className='sr-only'>Movies</h1>
      <MoviesHero />
      <MoviesCatalog />
    </>
  )
}
