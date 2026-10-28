import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from '@/components/shared/container'
import { MovieGridSkeleton } from '@/components/movies/browse/movie-grid-skeleton'
import { TopTenMovies } from '@/components/movies/browse/top-ten-movies'
import { CatalogBox } from '@/components/movies/catalog/catalog-box'
import { MoviesHero } from '@/components/movies/hero/movies-hero'
import { findGenre, genres } from '@/data/genres'

const GRID_HEADING_ID = 'genre-top-ten-heading'

/**
 * Prerenders every genre's shell, as the genre page does. A page doesn't
 * inherit `generateStaticParams` from the `[slug]` page beside it, and Cache
 * Components needs at least one param here anyway.
 */
export function generateStaticParams() {
  return genres.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps<'/movies/genres/[slug]/top-10'>): Promise<Metadata> {
  const genre = findGenre((await params).slug)
  return genre ? { title: `Top 10 ${genre.name} Movies` } : {}
}

/**
 * A genre's 10 most popular movies, reached from its "Top 10 In" card on the
 * Movies page: the Movies hero, then "Top 10 In <Genre>" on the box's pill
 * over the ranked cards. Laid out like the genre page, without "Load more".
 */
export default async function GenreTopTenPage({ params }: PageProps<'/movies/genres/[slug]/top-10'>) {
  const genre = findGenre((await params).slug)
  if (!genre) notFound()

  return (
    <>
      <h1 className='sr-only'>Top 10 {genre.name} movies</h1>
      <MoviesHero />
      <section aria-labelledby={GRID_HEADING_ID} className='mt-20 lg:mt-25 2xl:mt-45'>
        <h2 id={GRID_HEADING_ID} className='sr-only'>
          The 10 most popular {genre.name} movies
        </h2>
        <Container>
          <CatalogBox label={`Top 10 In ${genre.name}`}>
            <Suspense fallback={<MovieGridSkeleton />}>
              <TopTenMovies genre={genre} />
            </Suspense>
          </CatalogBox>
        </Container>
      </section>
    </>
  )
}
