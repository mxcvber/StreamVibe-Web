import Image from 'next/image'
import { notFound } from 'next/navigation'
import { connection } from 'next/server'

import { MovieActions } from '@/components/movies/detail/movie-actions'
import { MovieHeroFrame } from '@/components/movies/detail/movie-hero-frame'
import { getMovie } from '@/lib/api/movies'
import { type MovieHero, toMovieHero } from '@/lib/movie-detail'
import { parseMovieId } from '@/lib/movie-route'

type MovieDetailHeroProps = {
  /** The page's `params`, awaited here inside <Suspense>. */
  params: PageProps<'/movies/[id]'>['params']
}

/**
 * The movie page's first section: the backdrop filling the poster frame, the
 * title as the page's heading, the overview, and Play Now / Add to bookmarks.
 * Render it inside <Suspense> with `MovieDetailHeroSkeleton`.
 *
 * It awaits `params` itself so the page's shell prerenders for ids nobody
 * listed at build time, and `connection()` keeps `next build` from calling the
 * API, as in `TopGenresRow`. An id that isn't a number, or that the API
 * doesn't know, renders the not-found page; `notFound()` runs outside the
 * `try`, which would otherwise catch it.
 */
export async function MovieDetailHero({ params }: MovieDetailHeroProps) {
  const { id: param } = await params
  await connection()

  const id = parseMovieId(param)
  if (id === null) notFound()

  // Mapped inside the `try` too, so a malformed movie shows the message
  // rather than failing the page.
  let movie: MovieHero | null
  try {
    const detail = await getMovie(id)
    movie = detail && toMovieHero(detail)
  } catch (error) {
    console.error(`Failed to load movie ${id}`, error)
    return (
      <MovieHeroFrame className='justify-center'>
        <p className='text-center text-14 text-grey-60 lg:text-16 2xl:text-18'>
          We couldn&apos;t load this movie right now. Please try again later.
        </p>
      </MovieHeroFrame>
    )
  }

  if (!movie) notFound()

  return (
    <MovieHeroFrame>
      {/* The frame spans the page container: 100vw minus the 16 / 40 / 80px
          gutters, capped at the 1596px desktop content width. */}
      <Image
        src={movie.imageUrl}
        alt=''
        fill
        priority
        sizes='(min-width: 1756px) 1596px, (min-width: 1024px) calc(100vw - 160px), (min-width: 768px) calc(100vw - 80px), calc(100vw - 32px)'
        className='object-cover'
      />
      <div aria-hidden='true' className='absolute inset-0 bg-linear-to-t from-background to-background/0' />

      {/* Copy width is the artboards' text box (1000 / 1194px) as a
          max-width, as on the Movies hero. */}
      <div className='relative flex w-full flex-col items-center gap-5 lg:gap-6 2xl:gap-7.5'>
        <div className='flex flex-col items-center gap-0.5 text-center lg:max-w-250 2xl:max-w-298.5 2xl:gap-1'>
          <h1 className='text-24 font-bold lg:text-30 2xl:text-38'>{movie.title}</h1>
          {/* Mobile shows the title only; from `lg` the overview is pinned to
              two lines (`line-clamp` also sets `display`, revealing it). */}
          {movie.overview && (
            <p className='hidden text-16 text-muted-foreground lg:line-clamp-2 2xl:text-18'>{movie.overview}</p>
          )}
        </div>
        <MovieActions />
      </div>
    </MovieHeroFrame>
  )
}
