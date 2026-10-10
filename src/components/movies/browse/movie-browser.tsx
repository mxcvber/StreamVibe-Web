import { Suspense } from 'react'

import { AllMovies } from '@/components/movies/browse/all-movies'
import { movieBrowserClassName } from '@/components/movies/browse/browse-variants'
import { CatalogToolbar } from '@/components/movies/browse/catalog-toolbar'
import { MovieGridSkeleton } from '@/components/movies/browse/movie-grid-skeleton'
import { movieFiltersSearch, parseMovieFilters } from '@/lib/movie-filters'

type MovieBrowserProps = {
  /** The page's searchParams, passed through unawaited. */
  searchParams: PageProps<'/movies/all'>['searchParams']
}

/**
 * The "All Movies" toolbar over the grid, for the sort and filter in the URL.
 * Reading searchParams is request-time data, so render it inside <Suspense>
 * with `MovieBrowserFallback`; the hero and the box stay in the static shell.
 *
 * The grid's <Suspense> is keyed by the filters: a change remounts it, so it
 * shows the skeleton at once instead of keeping the old cards up for the
 * whole navigation, and `MovieGrid` starts over from the first page.
 */
export async function MovieBrowser({ searchParams }: MovieBrowserProps) {
  const filters = parseMovieFilters(await searchParams)

  return (
    <div className={movieBrowserClassName}>
      <CatalogToolbar filters={filters} />
      <Suspense key={movieFiltersSearch(filters)} fallback={<MovieGridSkeleton />}>
        <AllMovies filters={filters} />
      </Suspense>
    </div>
  )
}
