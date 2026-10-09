import type { Genre } from '@/data/genres'
import type { GenreTopMovies } from '@/lib/api/types'
import { slugify } from '@/lib/slugify'
import { tmdbPosterUrl } from '@/lib/tmdb-image'

/**
 * Maps the API's genres to the cards' `Genre` shape. The card's 2×2 mosaic
 * needs exactly four posters, so genres with fewer are left out.
 */
export function toGenreCards(items: GenreTopMovies[]): Genre[] {
  return items.flatMap(({ id, name, movies }) => {
    const [a, b, c, d] = movies.map((movie) => tmdbPosterUrl(movie.posterPath))
    if (!d) return []

    return [{ id, slug: slugify(name), name, posters: [a, b, c, d] }]
  })
}
