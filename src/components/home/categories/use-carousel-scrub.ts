import type { PointerEvent } from 'react'
import { useRef } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

/** Moves the carousel so that `api.scrollProgress()` becomes `fraction`. */
function scrollToFraction(api: NonNullable<CarouselApi>, fraction: number, instant: boolean) {
  // Read the engine on every call: Embla rebuilds it on each reInit.
  const { limit, target, scrollBody, scrollTo, options } = api.internalEngine()
  // Inverse of scrollProgress(): progress = (location − limit.max) / −limit.length.
  const location = limit.max - fraction * limit.length
  // Instant is what Embla's own drag handler does on pointer down; otherwise
  // glide there with the carousel's configured easing.
  if (instant) scrollBody.useFriction(0).useDuration(0)
  else scrollBody.useBaseFriction().useDuration(options.duration)
  // snap: false — a free position while scrubbing; the release snaps.
  scrollTo.distance(location - target.get(), false)
}

/**
 * Pointer handlers that turn a track element into a scrollbar for the
 * carousel: pressing the thumb drags it (keeping the grab offset), pressing
 * elsewhere on the track glides the thumb there, and releasing settles on the
 * nearest snap. The track's own bounding box is the scale, with the thumb
 * centred under the pointer, so callers only pass the thumb width.
 */
export function useCarouselScrub(api: CarouselApi, thumbWidth: number) {
  // Pointer − thumb centre when the press started on the thumb.
  const grabOffset = useRef(0)

  function fractionAt(event: PointerEvent<HTMLElement>) {
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const range = width - thumbWidth
    return range > 0 ? clamp01((event.clientX - left - grabOffset.current - thumbWidth / 2) / range) : 0
  }

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    if (!api || !event.isPrimary || event.button !== 0) return
    // No text selection or focus change on a mouse drag.
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    const { left, width } = event.currentTarget.getBoundingClientRect()
    const thumbStart = left + clamp01(api.scrollProgress()) * (width - thumbWidth)
    const onThumb = event.clientX >= thumbStart && event.clientX <= thumbStart + thumbWidth
    grabOffset.current = onThumb ? event.clientX - (thumbStart + thumbWidth / 2) : 0
    if (!onThumb) scrollToFraction(api, fractionAt(event), false)
  }

  // Holding the pointer capture doubles as the "dragging" flag: it is still
  // held while pointerup dispatches, and a stray pointerup without a press on
  // this element does nothing.
  function onPointerMove(event: PointerEvent<HTMLElement>) {
    if (!api || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    scrollToFraction(api, fractionAt(event), true)
  }

  function onPointerUp(event: PointerEvent<HTMLElement>) {
    if (!api || !event.currentTarget.hasPointerCapture(event.pointerId)) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    // Settle on the nearest snap with the carousel's own easing.
    api.scrollTo(api.selectedScrollSnap())
  }

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp }
}
