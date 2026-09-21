'use client'

import { useCallback, useSyncExternalStore } from 'react'

import { useCarouselScrub } from '@/components/home/categories/use-carousel-scrub'
import { useCarousel } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const TRACK_WIDTH = 79
const THUMB_WIDTH = 20

/**
 * The mobile artboard's carousel indicator, working as its scrollbar: a 79×5
 * track with a 20px red thumb that follows the scroll position and can be
 * dragged (or the track pressed) to scroll the cards. An invisible ::before
 * widens the hit area to roughly 99×45 without changing the 5px layout box.
 * Like a native scrollbar it is hidden from assistive tech and not focusable —
 * keyboard users page the carousel with the arrow keys on the region and tab
 * through the cards.
 */
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
