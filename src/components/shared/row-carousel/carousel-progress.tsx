'use client'

import { useCallback, useSyncExternalStore } from 'react'
import { useCarouselScrub } from '@/hooks/use-carousel-scrub'
import { useCarousel } from '@/components/shared/ui/carousel'
import { cn } from '@/lib/utils'

const TRACK_WIDTH = 79
const THUMB_WIDTH = 20

export function CarouselProgress({ className }: { className?: string }) {
  const { api } = useCarousel()
  const scrub = useCarouselScrub(api, THUMB_WIDTH)

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => {}
      api.on('scroll', onStoreChange)
      api.on('select', onStoreChange)
      api.on('reInit', onStoreChange)
      return () => {
        api.off('scroll', onStoreChange)
        api.off('select', onStoreChange)
        api.off('reInit', onStoreChange)
      }
    },
    [api],
  )

  // Embla reports progress slightly outside 0–1 while a drag overshoots.
  const progress = useSyncExternalStore(
    subscribe,
    () => Math.min(1, Math.max(0, api?.scrollProgress() ?? 0)),
    () => 0,
  )

  return (
    <div
      aria-hidden='true'
      data-slot='carousel-progress'
      className={cn(
        'relative mx-auto h-1.25 w-19.75 touch-none rounded-full bg-black-20 select-none before:absolute before:-inset-x-2.5 before:-inset-y-5',
        className,
      )}
      {...scrub}
    >
      <div
        className='h-full w-5 rounded-full bg-primary'
        style={{ transform: `translateX(${progress * (TRACK_WIDTH - THUMB_WIDTH)}px)` }}
      />
    </div>
  )
}
