import type { MovieSort } from '@/lib/movie-filters'

/**
 * Config for the "All Movies" page: the toolbar's labels and the grid card's
 * classes. Kept outside the client components so server components (the
 * loading skeleton) can read it too. The filter values themselves live in
 * `src/lib/movie-filters.ts`.
 */

/**
 * The sort buttons' labels. `newest` reads "Upcoming" because that is what
 * the API returns for it: unreleased movies only, soonest first.
 */
export const movieSortLabels = {
  popular: 'Popular',
  'top-rated': 'Top rated',
  newest: 'Upcoming',
} satisfies Record<MovieSort, string>

/** A note under the toolbar while a sort needs explaining. */
export const movieSortHints: Partial<Record<MovieSort, string>> = {
  newest: 'Movies not released yet, soonest first.',
}

/**
 * Grid columns: two on phones, three on tablets, four on laptops, five on
 * desktop. Gaps follow the rows' slide gutters (16px, 20px from `lg`) and the
 * box's 30px rhythm on desktop.
 */
export const movieGridClassName = 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 2xl:grid-cols-5 2xl:gap-7.5'

/** Each grid cell: the card stretches to the row's tallest. */
export const movieGridItemClassName = 'flex flex-col *:flex-1'

export const catalogMovieCardStyles = {
  // TMDB posters are 2:3.
  poster: 'aspect-[2/3] rounded-md 2xl:rounded-lg',
  // The widest poster in each range of the grid above: 276px just under
  // 1536px, 236px on a 1920px desktop.
  sizes: '(min-width: 1536px) 236px, (min-width: 1024px) 20vw, (min-width: 768px) 30vw, 45vw',
  title: 'line-clamp-1 text-14 font-semibold lg:text-16 2xl:text-18',
  // The top-10 rank pinned to the poster's corner. No artboard draws it, so
  // it copies `GenreCard`'s "Top 10 In" badge (25px tall, 32px on desktop),
  // which links to the page.
  rank: 'absolute top-2 left-2 rounded-lg bg-primary px-2 py-[6.5px] text-12 leading-none font-semibold 2xl:top-3 2xl:left-3 2xl:px-2.5 2xl:py-2 2xl:text-16',
}

/** The toolbar and grid's shared spacing, loaded and in the fallback. */
export const movieBrowserClassName = 'flex flex-col gap-6 lg:gap-10 2xl:gap-12.5'
