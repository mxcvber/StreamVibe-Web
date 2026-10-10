import { movieBrowserClassName } from '@/components/movies/browse/browse-variants'
import { CatalogToolbar } from '@/components/movies/browse/catalog-toolbar'
import { MovieGridSkeleton } from '@/components/movies/browse/movie-grid-skeleton'
import { DEFAULT_MOVIE_SORT } from '@/lib/movie-filters'

/**
 * Stands in for `MovieBrowser` until the URL has been read: the real toolbar,
 * disabled in its default state, over the grid skeleton.
 */
export function MovieBrowserFallback() {
  return (
    <div className={movieBrowserClassName}>
      <CatalogToolbar filters={{ sort: DEFAULT_MOVIE_SORT, rating: null }} disabled />
      <MovieGridSkeleton />
    </div>
  )
}
