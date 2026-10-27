import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Container } from '@/components/layout/container'
import { MovieBrowser } from '@/components/movies/browse/movie-browser'
import { MovieBrowserFallback } from '@/components/movies/browse/movie-browser-fallback'
import { CatalogBox } from '@/components/movies/catalog/catalog-box'
import { MoviesHero } from '@/components/movies/hero/movies-hero'

export const metadata: Metadata = {
  title: 'All Movies',
}

const GRID_HEADING_ID = 'all-movies-heading'

/**
 * The whole catalog, reached from the Movies page's "Movies" pill: the same
 * hero, then the sort and filter toolbar over a paginated grid. Spaced from
 * the hero like `MoviesCatalog`.
 *
 * The searchParams promise is handed down unawaited, so everything outside
 * `MovieBrowser`'s <Suspense> stays in the prerendered shell.
 */
export default function AllMoviesPage({ searchParams }: PageProps<'/movies/all'>) {
  return (
    <>
      <h1 className='sr-only'>All movies</h1>
      <MoviesHero />
      <section aria-labelledby={GRID_HEADING_ID} className='mt-20 lg:mt-25 2xl:mt-45'>
        <h2 id={GRID_HEADING_ID} className='sr-only'>
          Browse all movies
        </h2>
        <Container>
          <CatalogBox label='All Movies'>
            <Suspense fallback={<MovieBrowserFallback />}>
              <MovieBrowser searchParams={searchParams} />
            </Suspense>
          </CatalogBox>
        </Container>
      </section>
    </>
  )
}
