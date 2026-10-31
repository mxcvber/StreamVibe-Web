import type { Genre } from '@/data/genres'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { PosterMosaic } from '@/components/shared/poster-mosaic'
import { PosterSrc } from '@/types/poster-mosaic'
import { Fragment } from 'react/jsx-runtime'

export function GenreCard({ genre }: { genre: Genre }) {
  const [a, b, c, d] = genre.posters as PosterSrc[]

  return (
    <Fragment>
      <div className='relative overflow-hidden aspect-[138.4/140] lg:aspect-[191.8/210] 2xl:aspect-[235.4/252]'>
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
        <div className='flex min-w-0 flex-1 flex-col items-start gap-0.5 2xl:gap-1'>
          <h3 className='w-full truncate font-semibold text-14 lg:text-16 2xl:text-18' title={genre.name}>
            {genre.name}
          </h3>
        </div>

        <ArrowRightIcon className='shrink-0 size-5 lg:size-6 2xl:size-7.5' />
      </div>
    </Fragment>
  )
}
