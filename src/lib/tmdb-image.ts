/** Poster widths TMDB serves; see https://developer.themoviedb.org/docs/image-basics. */
type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'

/**
 * The CDN URL for a TMDB poster path ("/abc123.jpg"). next/image resizes it
 * again, so pick the smallest size that still covers the tile at 2× DPR.
 */
export function tmdbPosterUrl(path: string, size: PosterSize = 'w342') {
  return `https://image.tmdb.org/t/p/${size}${path}`
}

/** Backdrop widths TMDB serves; see the link above. */
type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'

/**
 * The CDN URL for a TMDB backdrop path. Defaults to the original because the
 * movie page's frame is up to 1596px wide, which w1280 would upscale;
 * next/image still resizes it to the `sizes` the frame asks for.
 */
export function tmdbBackdropUrl(path: string, size: BackdropSize = 'original') {
  return `https://image.tmdb.org/t/p/${size}${path}`
}
