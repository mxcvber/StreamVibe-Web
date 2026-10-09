import type { MustWatchMovie } from '@/lib/api/types'
import { formatCount, formatRuntime } from '@/lib/format'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/** What a "Must - Watch Movies" card renders. */
export type MustWatch = {
  id: number
  title: string
  posterUrl: string
  /** Formatted ("1h 57min"); null hides the runtime chip. */
  runtime: string | null
  /** 0–5 in halves: the 0–10 average rounded to a whole number, then halved. */
  stars: number
  /** Formatted ("20K"). */
  votes: string
}

/** Maps the API's must-watch movies to the cards' shape, keeping their order. */
export function toMustWatch(items: MustWatchMovie[]): MustWatch[] {
  return items.map(({ id, title, posterPath, runtime, voteAverage, voteCount }) => ({
    id,
    title,
    // 319px at most (desktop), so 639px at 2×.
    posterUrl: tmdbPosterUrl(posterPath, 'w780'),
    runtime: runtime === null ? null : formatRuntime(runtime),
    // Figma draws only full, half and empty stars, so 8.3 → 4 and 8.6 → 4.5.
    stars: Math.round(voteAverage) / 2,
    votes: formatCount(voteCount),
  }))
}
