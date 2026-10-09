import { trendingViews } from '@/data/trending-views'
import type { PopularMovie } from '@/lib/api/types'
import { formatRuntime, formatCount } from '@/lib/format'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/** What a "Trending Now" card renders. */
export type TrendingMovie = {
  id: number
  title: string
  posterUrl: string
  /** Formatted ("1h 30min", or "1h 30m" for narrow cards); null hides the runtime chip. */
  runtime: { long: string; short: string } | null
  /** Formatted ("986K"); null past the placeholder list hides the views chip. */
  views: string | null
}

/** Maps the API's popular movies to the cards' shape, keeping their order. */
export function toTrendingMovies(items: PopularMovie[]): TrendingMovie[] {
  return items.map(({ id, title, posterPath, runtime }, index) => {
    const views = trendingViews[index]

    return {
      id,
      title,
      // 244px at most (desktop), so 488px at 2×.
      posterUrl: tmdbPosterUrl(posterPath, 'w500'),
      runtime: runtime === null ? null : { long: formatRuntime(runtime), short: formatRuntime(runtime, 'short') },
      views: views === undefined ? null : formatCount(views),
    }
  })
}
