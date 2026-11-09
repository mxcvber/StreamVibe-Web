import type { Genre } from '@/data/genres'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { PosterMosaic } from '@/components/shared/poster-mosaic'
import { Fragment } from 'react/jsx-runtime'
import { PosterSrc } from '@/types/poster-mosaic'

export function TopGenresCard({ genre }: { genre: Genre }) {
  const [a, b, c, d] = genre.posters as PosterSrc[]

  return (
    <Fragment>
      <div className='relative overflow-hidden aspect-191.75/177 lg:aspect-225/206 2xl:aspect-292/252'>
        <PosterMosaic
          rows={[
            [a, b],
            [c, d],
          ]}
          sizes='(min-width: 1536px) 144px, (min-width: 1024px) 112px, 96px'
          tileClassName='rounded-[4px]'
          className='absolute inset-0 [--mosaic-gap:10px]'
        />

        <div className='absolute inset-0 bg-linear-to-b from-card/0 to-card' />
      </div>

      <div className='flex items-center gap-5'>
        <div className='flex min-w-0 flex-1 flex-col items-start gap-0.5 2xl:gap-1'>
          <span className='rounded-lg bg-primary px-2 py-[6.5px] text-12 leading-none font-semibold 2xl:px-2.5 2xl:py-2 2xl:text-16'>
            Top 10 In
          </span>

          <h3 className='w-full truncate font-semibold text-16 2xl:text-20' title={genre.name}>
            {genre.name}
          </h3>
        </div>

        <ArrowRightIcon className='shrink-0 size-6 2xl:size-7.5' />
      </div>
    </Fragment>
  )
}
