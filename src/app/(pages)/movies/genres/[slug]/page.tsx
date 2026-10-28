import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/shared/container'
import { GenreMovies } from '@/components/movies/browse/genre-movies'
import { MovieGridSkeleton } from '@/components/movies/browse/movie-grid-skeleton'
import { CatalogBox } from '@/components/movies/catalog/catalog-box'
import { MoviesHero } from '@/components/movies/hero/movies-hero'
import { findGenre, genres } from '@/data/genres'

const GRID_HEADING_ID = 'genre-movies-heading'

/**
 * All 19 genres are known up front, so every genre page's shell is
 * prerendered; Cache Components needs at least one param here anyway. Any
 * other slug renders at request time and 404s below (`dynamicParams` isn't
 * available under Cache Components).
 */
export function generateStaticParams() {
  return genres.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/movies/genres/[slug]'>): Promise<Metadata> {
  const genre = findGenre((await params).slug)
  return genre ? { title: `${genre.name} Movies` } : {}
}

/**
 * Every released movie in one genre, newest first, reached from any genre
 * card: the Movies hero, then the genre's name on the box's pill over a
 * paginated grid. Laid out like the "All Movies" page, without its toolbar.
 *
 * The slug resolves through the local genre table (`findGenre`), which also
 * gives the API's genre id; the API doesn't return the name.
 */
export default async function GenrePage({ params }: PageProps<'/movies/genres/[slug]'>) {
  const genre = findGenre((await params).slug)
  if (!genre) notFound()

  return (
    <>
      <h1 className='sr-only'>{genre.name} movies</h1>
      <MoviesHero />
      <section aria-labelledby={GRID_HEADING_ID} className='mt-20 lg:mt-25 2xl:mt-45'>
        <h2 id={GRID_HEADING_ID} className='sr-only'>
          Browse {genre.name} movies
        </h2>
        <Container>
          <CatalogBox label={genre.name}>
            <Suspense fallback={<MovieGridSkeleton />}>
              <GenreMovies genre={genre} />
            </Suspense>
          </CatalogBox>
        </Container>
      </section>
    </>
  )
}
