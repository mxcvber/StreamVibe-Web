/** Poster widths TMDB serves; see https://developer.themoviedb.org/docs/image-basics. */
type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'

/**
 * The CDN URL for a TMDB poster path ("/abc123.jpg"). next/image resizes it
 * again, so pick the smallest size that still covers the tile at 2× DPR.
 */
export function tmdbPosterUrl(path: string, size: PosterSize = 'w342') {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
