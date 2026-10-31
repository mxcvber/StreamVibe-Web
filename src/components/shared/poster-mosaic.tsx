import { type PosterSrc } from '@/types/poster-mosaic'
import Image from 'next/image'
import { mosaicRevealAt } from '@/lib/poster-mosaic'
import { cn } from '@/lib/utils'

type MosaicGrid = { rows: number; columns: number }

type PosterMosaicProps = {
  rows: PosterSrc[][]
  sizes: string
  visible?: Record<'base' | 'lg', MosaicGrid>
  className?: string
  tileClassName?: string
  loading?: 'lazy' | 'eager'
  quality?: 50 | 75 | 100
}

export function PosterMosaic({
  rows,
  visible,
  sizes,
  className,
  tileClassName,
  loading = 'lazy',
  quality = 75,
}: PosterMosaicProps) {
  return (
    <div aria-hidden='true' className={cn('flex flex-col gap-(--mosaic-gap) [--mosaic-gap:20px]', className)}>
      {rows.map((row, rowIndex) => {
        const rowReveal = visible && mosaicRevealAt(rowIndex, visible.base.rows, visible.lg.rows)

        return (
          <div
            key={rowIndex}
            className={cn(
              'flex min-h-0 flex-1 gap-(--mosaic-gap)',
              rowReveal && (rowReveal === 'lg' ? 'hidden lg:flex' : 'hidden 2xl:flex'),
            )}
          >
            {row.map((src, columnIndex) => {
              const tileReveal = visible && mosaicRevealAt(columnIndex, visible.base.columns, visible.lg.columns)

              return (
                <div
                  key={columnIndex}
                  className={cn(
                    'relative min-w-0 flex-1 overflow-hidden',
                    tileClassName,
                    tileReveal && (tileReveal === 'lg' ? 'hidden lg:block' : 'hidden 2xl:block'),
                  )}
                >
                  <Image
                    src={src}
                    alt=''
                    fill
                    sizes={sizes}
                    loading={rowReveal || tileReveal ? 'lazy' : loading}
                    quality={quality}
                    className='object-cover'
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
