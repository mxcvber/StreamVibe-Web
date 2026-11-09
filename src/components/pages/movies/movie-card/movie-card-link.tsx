import Link from 'next/link'
import type { ReactNode } from 'react'

import { movieHref } from '@/lib/movie-route'

type MovieCardLinkProps = {
  /** TMDB movie id. */
  id: number
  /** The card: one `Card`. */
  children: ReactNode
}

/**
 * Makes a movie card lead to the movie's page. The link takes the card's
 * shape: its focus ring follows the card's 10 / 12px radius, and it passes
 * `flex-1` down so a grid cell still stretches the card to the row's tallest.
 * Hovering brightens the card's border, as on `GenreCard`.
 *
 * No `'use client'`: server rows and the client `MovieGrid` both render it.
 */
export function MovieCardLink({ id, children }: MovieCardLinkProps) {
  return (
    <Link
      href={movieHref(id)}
      className='flex flex-col rounded-md outline-none *:flex-1 *:transition-colors hover:*:border-black-20 focus-visible:ring-3 focus-visible:ring-ring/50 2xl:rounded-lg'
    >
      {children}
    </Link>
  )
}
