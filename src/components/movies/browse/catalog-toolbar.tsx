'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'

import { StarIcon } from '@/components/icons/star'
import { BrowseMessage } from '@/components/movies/browse/browse-message'
import { movieSortHints, movieSortLabels } from '@/components/movies/browse/browse-variants'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MOVIE_RATINGS, MOVIE_SORTS, type MovieFilters, movieFiltersSearch } from '@/lib/movie-filters'

const SORT_LABEL_ID = 'movies-sort-label'
const RATING_LABEL_ID = 'movies-rating-label'

const labelClassName = 'text-14 font-medium text-grey-60 2xl:text-16'
const itemClassName =
  'px-3 data-[state=on]:bg-black-15 data-[state=on]:text-foreground 2xl:h-10 2xl:px-4 2xl:text-16'

type CatalogToolbarProps = {
  /** The filters in the URL. */
  filters: MovieFilters
  /** For the loading fallback, before the URL has been read. */
  disabled?: boolean
}

/**
 * The sort and rating controls above the "All Movies" grid. A change pushes
 * the new filters into the URL, so Back undoes it and the link can be shared.
 * The server then re-renders the grid, whose <Suspense> is keyed by the
 * filters and shows its skeleton meanwhile. The pressed buttons switch right
 * away (`useOptimistic`) rather than when the navigation finishes.
 *
 * A sort is always set, so pressing the active one does nothing; pressing the
 * active rating clears the filter.
 */
export function CatalogToolbar({ filters, disabled = false }: CatalogToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [shown, setShown] = useOptimistic(filters)
  const [, startTransition] = useTransition()

  function apply(next: MovieFilters) {
    startTransition(() => {
      setShown(next)
      // No scroll: the toolbar sits far below the top of the page.
      router.push(`${pathname}${movieFiltersSearch(next)}`, { scroll: false })
    })
  }

  function changeSort(value: string) {
    const sort = MOVIE_SORTS.find((option) => option === value)
    if (sort && sort !== shown.sort) apply({ ...shown, sort })
  }

  function changeRating(value: string) {
    const rating = MOVIE_RATINGS.find((option) => String(option) === value) ?? null
    if (rating !== shown.rating) apply({ ...shown, rating })
  }

  const hint = movieSortHints[shown.sort]

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end md:justify-between'>
        <div className='flex flex-col gap-2'>
          <span id={SORT_LABEL_ID} className={labelClassName}>
            Sort by
          </span>
          <ToggleGroup
            type='single'
            value={shown.sort}
            onValueChange={changeSort}
            disabled={disabled}
            variant='outline'
            size='lg'
            aria-labelledby={SORT_LABEL_ID}
          >
            {MOVIE_SORTS.map((sort) => (
              <ToggleGroupItem key={sort} value={sort} className={itemClassName}>
                {movieSortLabels[sort]}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className='flex flex-col gap-2'>
          <span id={RATING_LABEL_ID} className={labelClassName}>
            Rating
          </span>
          <ToggleGroup
            type='single'
            value={shown.rating === null ? '' : String(shown.rating)}
            onValueChange={changeRating}
            disabled={disabled}
            variant='outline'
            size='lg'
            aria-labelledby={RATING_LABEL_ID}
          >
            {MOVIE_RATINGS.map((rating) => (
              <ToggleGroupItem
                key={rating}
                value={String(rating)}
                // The API matches cards showing N or N.5 stars; 5 is the top.
                aria-label={rating === 5 ? '5 stars' : `${rating} or ${rating}.5 stars`}
                className={itemClassName}
              >
                {rating}
                <StarIcon className='size-3.5 text-red-45 2xl:size-4' />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
      {hint && <BrowseMessage className='text-12 lg:text-14 2xl:text-14'>{hint}</BrowseMessage>}
    </div>
  )
}
