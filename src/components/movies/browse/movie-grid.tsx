'use client'

import { useState, useTransition } from 'react'

import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { movieGridClassName, movieGridItemClassName } from '@/components/movies/browse/browse-variants'
import { CatalogMovieCard } from '@/components/movies/browse/catalog-movie-card'
import { Button } from '@/components/ui/button'
import type { MoviesPage } from '@/lib/catalog-movies'
import { cn } from '@/lib/utils'

type MovieGridProps = {
  /** The first page, rendered on the server. */
  initialPage: MoviesPage
  /**
   * The Server Action that loads the page after a cursor, bound by the server
   * parent to whatever else the list needs (`loadMoreMovies.bind(null,
   * filters)`, `loadMoreGenreMovies.bind(null, genreId)`).
   */
  loadMoreAction: (cursor: number) => Promise<MoviesPage>
}

/**
 * A catalog grid ("All Movies", a genre's page) with a "Load more" button
 * that appends the next page through `loadMoreAction`. On "All Movies",
 * changing the sort or filter remounts the grid (its <Suspense> is keyed by
 * them), which starts it over from the first page. The button disappears on
 * the last page. If a page fails, the loaded cards stay and the button offers
 * a retry.
 */
export function MovieGrid({ initialPage, loadMoreAction }: MovieGridProps) {
  const [movies, setMovies] = useState(initialPage.movies)
  const [cursor, setCursor] = useState(initialPage.nextCursor)
  const [failed, setFailed] = useState(false)
  const [isPending, startTransition] = useTransition()

  function loadMore() {
    if (cursor === null) return

    setFailed(false)
    startTransition(async () => {
      try {
        const page = await loadMoreAction(cursor)
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
          <li key={movie.id} className={movieGridItemClassName}>
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
