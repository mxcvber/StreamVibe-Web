import type { Metadata } from 'next'
import { connection } from 'next/server'
import { Suspense } from 'react'

import { MovieDetailHero } from '@/components/movies/detail/movie-detail-hero'
import { MovieDetailHeroSkeleton } from '@/components/movies/detail/movie-detail-hero-skeleton'
import { getMovie } from '@/lib/api/movies'
import { parseMovieId } from '@/lib/movie-route'

/**
 * One known id (Avatar), only so the build has a pathname to prerender with:
 * the header's nav reads `usePathname()` outside any <Suspense>, which fails
 * the build for a dynamic route with no params at all. The hero still defers
 * to request time, so this prerenders the shell, not the movie, and never
 * calls the API. Every other id renders on request.
 */
export function generateStaticParams() {
  return [{ id: '19995' }]
}

/**
 * Every other id renders its shell on request, because the header's nav needs
 * the pathname and doesn't sit in <Suspense>; without this, dev flags each
 * movie page as a blocking route. It only sets dev-time validation and
 * changes nothing at runtime.
 */
export const instant = false

/**
 * The tab title is the movie's. `connection()` keeps `next build` from calling
 * the API, and since the page streams its hero anyway, the metadata streams
 * with it. A failed request falls back to the layout's "Movies" title; the
 * hero logs the error and shows its message.
 */
export async function generateMetadata({ params }: PageProps<'/movies/[id]'>): Promise<Metadata> {
  const { id: param } = await params
  await connection()

  const id = parseMovieId(param)
  if (id === null) return {}

  try {
    const movie = await getMovie(id)
    return movie ? { title: movie.title } : {}
  } catch {
    return {}
  }
}

/**
 * A movie's page, reached from any movie card. For now it holds only the
 * poster frame; the description, cast, reviews and details follow.
 *
 * Movie ids can't be listed at build time, so the page's shell is the
 * skeleton, and the hero awaits `params` inside <Suspense> at request time
 * (see Cache Components' guidance on dynamic params). Unknown ids render the
 * not-found page there.
 */
export default function MoviePage({ params }: PageProps<'/movies/[id]'>) {
  return (
    <Suspense fallback={<MovieDetailHeroSkeleton />}>
      <MovieDetailHero params={params} />
    </Suspense>
  )
}
