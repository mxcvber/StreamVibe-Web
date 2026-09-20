import Link from 'next/link'

import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { PosterMosaic } from '@/components/home/hero/poster-mosaic'
import { Card } from '@/components/ui/card'
import type { Genre } from '@/data/genres'

export function CategoryCard({ genre }: { genre: Genre }) {
  const [a, b, c, d] = genre.posters

  return (
    <Link
      href={`/movies?genre=${genre.slug}`}
      className='group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
    >
      <Card className='p-7.25 transition-colors group-hover:border-black-20'>
        {/* 2×2 poster mosaic fading into the card so the title reads cleanly.
            Sized by aspect ratio (design: 235.4px wide × 252px tall) rather than
            a fixed height, so the tiles keep their proportions when the card
            shrinks with the viewport instead of turning tall and narrow. */}
        <div className='relative aspect-[235.4/252] overflow-hidden'>
          <PosterMosaic
            rows={[
              [a, b],
              [c, d],
            ]}
            sizes='120px'
            tileClassName='rounded-md'
            className='absolute inset-0 [--mosaic-gap:5px]'
          />
          <div className='absolute inset-0 bg-linear-to-b from-card/0 to-card' />
        </div>
        <div className='flex items-center gap-2'>
          {/* min-w-0 lets the flex item shrink below its text width so the
              ellipsis can kick in on narrow cards ("Science Fiction"). */}
          <h3 className='min-w-0 flex-1 truncate text-18 font-semibold' title={genre.name}>
            {genre.name}
          </h3>
          <ArrowRightIcon className='size-7.5 shrink-0' />
        </div>
      </Card>
    </Link>
  )
}
