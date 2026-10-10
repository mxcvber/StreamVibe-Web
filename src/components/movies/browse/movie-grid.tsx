'use client'

import { useState, useTransition } from 'react'

import { type MoviesPage, loadMoreMovies } from '@/app/movies/all/actions'
import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { movieGridClassName } from '@/components/movies/browse/browse-variants'
import { CatalogMovieCard } from '@/components/movies/browse/catalog-movie-card'
import { Button } from '@/components/ui/button'
import type { MovieFilters } from '@/lib/movie-filters'
import { cn } from '@/lib/utils'

type MovieGridProps = {
  /** The sort and filter every page is loaded with. */
  filters: MovieFilters
  /** The first page, rendered on the server. */
  initialPage: MoviesPage
}

/**
 * The "All Movies" grid with a "Load more" button that appends the next page
 * through the `loadMoreMovies` Server Action, in the same sort and filter.
 * Changing them remounts the grid (its <Suspense> is keyed by them), which
 * starts it over from the first page. The button disappears on the
 * last page. If a page fails, the loaded cards stay and the button offers a
 * retry.
 */
export function MovieGrid({ filters, initialPage }: MovieGridProps) {
  const [movies, setMovies] = useState(initialPage.movies)
  const [cursor, setCursor] = useState(initialPage.nextCursor)
  const [failed, setFailed] = useState(false)
  const [isPending, startTransition] = useTransition()

  function loadMore() {
    if (cursor === null) return

    setFailed(false)
    startTransition(async () => {
      try {
        const page = await loadMoreMovies(filters, cursor)
        // Updates after an `await` need their own transition to stay part of it.
        startTransition(() => {
          setMovies((loaded) => {
            // A cache refresh between pages can move a movie across the page
            // boundary; skip the repeat instead of rendering it twice.
            const ids = new Set(loaded.map((movie) => movie.id))
            return [...loaded, ...page.movies.filter((movie) => !ids.has(movie.id))]
          })
          setCursor(page.nextCursor)
        })
      } catch (error) {
        console.error('Failed to load more movies', error)
        setFailed(true)
      }
    })
  }

  return (
    <div className='flex flex-col items-center gap-6 lg:gap-10 2xl:gap-12.5'>
      <ul className={cn('w-full', movieGridClassName)}>
        {movies.map((movie) => (
          <li key={movie.id} className='flex flex-col *:flex-1'>
            <CatalogMovieCard movie={movie} />
          </li>
        ))}
      </ul>
      {cursor !== null && (
        <div className='flex flex-col items-center gap-3'>
          <div aria-live='polite'>
            {failed && <BrowseMessage>We couldn&apos;t load more movies. Please try again.</BrowseMessage>}
          </div>
          <Button variant='secondary' onClick={loadMore} disabled={isPending}>
            {isPending ? 'Loading…' : failed ? 'Try again' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  )
}
