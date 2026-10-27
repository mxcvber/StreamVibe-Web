import type { MovieDetail } from '@/lib/api/types'
import { tmdbBackdropUrl, tmdbPosterUrl } from '@/lib/tmdb-image'

/** What the movie page's poster frame renders. */
export type MovieHero = {
  title: string
  /** Null hides the overview. */
  overview: string | null
  /** The backdrop, or the poster for the few movies TMDB has no backdrop for. */
  imageUrl: string
}

/** Maps the API's movie to the poster frame's shape. */
export function toMovieHero({ title, overview, backdropPath, posterPath }: MovieDetail): MovieHero {
  return {
    title,
    overview,
    // The original in both cases: the frame is up to 1596px wide, wider than
    // any smaller size of either image.
    imageUrl: backdropPath ? tmdbBackdropUrl(backdropPath) : tmdbPosterUrl(posterPath, 'original'),
  }
}
