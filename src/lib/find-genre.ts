import { Genre, genres } from '@/data/genres'

export function findGenre(slug: string): Genre | undefined {
  return genres.find((genre) => genre.slug === slug)
}
