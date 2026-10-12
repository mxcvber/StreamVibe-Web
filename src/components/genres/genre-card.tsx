import Link from 'next/link'

import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { PosterMosaic } from '@/components/home/hero/poster-mosaic'
import { Card } from '@/components/ui/card'
import { genreCardStyles, type GenreCardVariant } from '@/components/genres/genre-variants'
import type { Genre } from '@/data/genres'
import { cn } from '@/lib/utils'

type GenreCardProps = {
  genre: Genre
  variant?: GenreCardVariant
}

export function GenreCard({ genre, variant = 'genre' }: GenreCardProps) {
  const styles = genreCardStyles[variant]
  const [a, b, c, d] = genre.posters

  return (
    <Link
      href={`/movies/genres/${genre.slug}`}
      className='group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
    >
      <Card className={cn('transition-colors group-hover:border-black-20', styles.card)}>
        {/* 2×2 poster mosaic fading into the card so the title reads cleanly. */}
        <div className={cn('relative overflow-hidden', styles.mosaic)}>
          <PosterMosaic
            rows={[
              [a, b],
              [c, d],
            ]}
            sizes={styles.sizes}
            tileClassName={styles.tile}
            className={cn('absolute inset-0', styles.gap)}
          />
          <div className='absolute inset-0 bg-linear-to-b from-card/0 to-card' />
        </div>
        <div className={cn('flex items-center', styles.footer)}>
          {/* min-w-0 lets the flex item shrink below its text width so the
              ellipsis can kick in on narrow cards ("Science Fiction"). */}
          <div className='flex min-w-0 flex-1 flex-col items-start gap-0.5 2xl:gap-1'>
            {variant === 'top10' && (
              // leading-none + padding reproduces the design's cap-height
              // trimmed box (25px tall on mobile, 32px on desktop) in every
              // browser, which `text-box-trim` doesn't yet.
              <span className='rounded-lg bg-primary px-2 py-[6.5px] text-12 leading-none font-semibold 2xl:px-2.5 2xl:py-2 2xl:text-16'>
                Top 10 In
              </span>
            )}
            <h3 className={cn('w-full truncate font-semibold', styles.title)} title={genre.name}>
              {genre.name}
            </h3>
          </div>
          <ArrowRightIcon className={cn('shrink-0', styles.icon)} />
        </div>
      </Card>
    </Link>
  )
}
