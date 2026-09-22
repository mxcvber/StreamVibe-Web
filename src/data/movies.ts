export type BackdropSrc = `/images/backdrops/${string}.webp`

export type Movie = {
  /** TMDB movie id — what the backend's movies table will store (mirrors `Genre.id`). */
  id: number
  slug: string
  title: string
  overview: string
  /** Wide still used by the Movies hero; a `poster_path` counterpart comes with the cards. */
  backdropSrc: BackdropSrc
}

/**
 * Hero slides. Stands in for the NestJS/TMDB "featured" endpoint until the API
 * exists: one entry per file in public/images/backdrops/. The hero renders one
 * slide per entry, so adding a movie here adds a slide.
 */
export const featuredMovies: Movie[] = [
  {
    id: 1,
    slug: 'avengers-endgame',
    title: 'Avengers: Endgame',
    overview:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    backdropSrc: '/images/backdrops/avengers-endgame.webp',
  },
  {
    id: 2,
    slug: 'avengers-infinity-war',
    title: 'Avengers: Infinity War',
    overview:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    backdropSrc: '/images/backdrops/avengers-infinity-war.webp',
  },
  {
    id: 3,
    slug: 'avengers-doomsday',
    title: 'Avengers: Doomsday',
    overview:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    backdropSrc: '/images/backdrops/avengers-doomsday.webp',
  },
  {
    id: 4,
    slug: 'avengers-age-of-ultron',
    title: 'Avengers: Age of Ultron',
    overview:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    backdropSrc: '/images/backdrops/avengers-age-of-ultron.webp',
  },
  {
    id: 5,
    slug: 'avengers',
    title: 'The Avengers',
    overview:
      "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
    backdropSrc: '/images/backdrops/avengers.webp',
  },
]
