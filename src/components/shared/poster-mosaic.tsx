import { type PosterSrc } from '@/types/poster-mosaic'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type PosterMosaicProps = {
  rows: PosterSrc[][]
  sizes: string
  className?: string
  tileClassName?: string
  loading?: 'lazy' | 'eager'
  quality?: 50 | 75 | 100
}

export function PosterMosaic({
  rows,
  sizes,
  className,
  tileClassName,
  loading = 'lazy',
  quality = 75,
}: PosterMosaicProps) {
  return (
    <div aria-hidden='true' className={cn('flex flex-col gap-(--mosaic-gap) [--mosaic-gap:20px]', className)}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className='flex min-h-0 flex-1 gap-(--mosaic-gap)'>
          {row.map((src, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className={cn('relative min-w-0 flex-1 overflow-hidden', tileClassName)}
            >
              <Image src={src} alt='' fill sizes={sizes} loading={loading} quality={quality} className='object-cover' />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
