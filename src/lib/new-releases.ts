import type { NewReleaseMovie } from '@/lib/api/types'
import { formatReleaseDate } from '@/lib/format'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/** What a "New Releases" card renders. */
export type NewRelease = {
  id: number
  title: string
  posterUrl: string
  /** "YYYY-MM-DD", for `<time dateTime>`. */
  releaseDate: string
  /** Formatted ("30 Sept 2026"). */
  releasedOn: string
}

/** Maps the API's new releases to the cards' shape, keeping their order. */
export function toNewReleases(items: NewReleaseMovie[]): NewRelease[] {
  return items.map(({ id, title, posterPath, releaseDate }) => ({
    id,
    title,
    // 244px at most (desktop), so 488px at 2×.
    posterUrl: tmdbPosterUrl(posterPath, 'w500'),
    releaseDate,
    releasedOn: formatReleaseDate(releaseDate),
  }))
}
