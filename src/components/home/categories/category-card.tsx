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
      <Card className='p-4.75 transition-colors group-hover:border-black-20 lg:p-5.75 2xl:p-7.25'>
        {/* 2×2 poster mosaic fading into the card so the title reads cleanly.
            Sized by the artboards' aspect ratios (138.4×140 mobile, 191.8×210
            laptop, 235.4×252 desktop) rather than a fixed height, so the tiles
            keep their proportions when the card shrinks with the viewport
            instead of turning tall and narrow. */}
        <div className='relative aspect-[138.4/140] overflow-hidden lg:aspect-[191.8/210] 2xl:aspect-[235.4/252]'>
          <PosterMosaic
            rows={[
              [a, b],
              [c, d],
            ]}
            sizes='(min-width: 1536px) 120px, (min-width: 1024px) 96px, 72px'
            tileClassName='rounded-md'
            className='absolute inset-0 [--mosaic-gap:5px]'
          />
          <div className='absolute inset-0 bg-linear-to-b from-card/0 to-card' />
        </div>
        <div className='flex items-center gap-2'>
          {/* min-w-0 lets the flex item shrink below its text width so the
              ellipsis can kick in on narrow cards ("Science Fiction"). */}
          <h3 className='min-w-0 flex-1 truncate text-14 font-semibold lg:text-16 2xl:text-18' title={genre.name}>
            {genre.name}
          </h3>
          <ArrowRightIcon className='size-5 shrink-0 lg:size-6 2xl:size-7.5' />
        </div>
      </Card>
    </Link>
  )
}
