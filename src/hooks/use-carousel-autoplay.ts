'use client'

import type { FocusEvent, PointerEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { CarouselApi } from '@/components/ui/carousel'
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

/**
 * Advances a carousel on a timer. Returns the `setApi` prop plus pointer and
 * focus handlers to spread onto `<Carousel>`, which puts them on the region
 * root — so hovering or tabbing anywhere in the frame pauses it, controls
 * that are overlaid on the slides included.
 *
 * The timer is ours rather than `embla-carousel-autoplay`'s because that
 * plugin resumes itself unconditionally after a drag or a mouse leave, which
 * overrides any pause applied from outside, and it only watches focus on the
 * slides themselves — neither fits a hero whose arrows and dots sit outside
 * the Embla root.
 */
export function useCarouselAutoplay({ delay }: { delay: number }) {
  const [api, setApi] = useState<CarouselApi>()
  const reduceMotion = usePrefersReducedMotion()
  // Refs rather than state: a hold reschedules a timer and changes nothing on
  // screen, so re-rendering every slide on hover would be wasted work.
  const holds = useRef({ hover: false, focus: false, drag: false, hidden: false })
  const timer = useRef(0)

  // The one place a timer is ever set. Every pause, resume and advance funnels
  // through it, and each call gives the current slide a whole fresh delay.
  const sync = useCallback(() => {
    window.clearTimeout(timer.current)
    const { hover, focus, drag, hidden } = holds.current
    if (!api || reduceMotion || hover || focus || drag || hidden) return
    // Below two snaps there is nowhere to advance to.
    if (api.scrollSnapList().length <= 1) return
    timer.current = window.setTimeout(() => api.scrollNext(), delay)
  }, [api, delay, reduceMotion])

  useEffect(() => {
    if (!api) return

    // A drag owns the carousel while it lasts; `pointerUp` fires on release,
    // so the countdown restarts from the moment the visitor lets go.
    const dragStart = () => {
      holds.current.drag = true
      sync()
    }
    const dragEnd = () => {
      holds.current.drag = false
      sync()
    }
    // A background tab would otherwise queue up slides nobody is watching and
    // show a burst of them on return.
    const visibilityChange = () => {
      holds.current.hidden = document.hidden
      sync()
    }

    // `select` both sustains the loop — the timer only calls `scrollNext()`,
    // and the selection change it causes schedules the next one — and restarts
    // the countdown when the visitor uses the arrows, the dots or a swipe.
    api.on('select', sync)
    api.on('reInit', sync)
    api.on('pointerDown', dragStart)
    api.on('pointerUp', dragEnd)
    document.addEventListener('visibilitychange', visibilityChange)

    holds.current.hidden = document.hidden
    sync()

    return () => {
      window.clearTimeout(timer.current)
      api.off('select', sync)
      api.off('reInit', sync)
      api.off('pointerDown', dragStart)
      api.off('pointerUp', dragEnd)
      document.removeEventListener('visibilitychange', visibilityChange)
    }
  }, [api, sync])

  // Mouse and pen only: iOS fires a synthetic pointerenter on tap, which would
  // leave the carousel parked until the visitor tapped somewhere else.
  function onPointerEnter(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return
    holds.current.hover = true
    sync()
  }

  function onPointerLeave(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return
    holds.current.hover = false
    sync()
  }

  // Only keyboard focus holds the carousel. Clicking a control focuses it too,
  // and that case is already covered by hover — treating it as a hold would
  // keep the carousel parked long after the pointer had moved away.
  function onFocus(event: FocusEvent<HTMLElement>) {
    holds.current.focus = event.target.matches(':focus-visible')
    sync()
  }

  function onBlur(event: FocusEvent<HTMLElement>) {
    // Ignore focus moving between two controls inside the frame.
    if (event.currentTarget.contains(event.relatedTarget)) return
    holds.current.focus = false
    sync()
  }

  return { setApi, onPointerEnter, onPointerLeave, onFocus, onBlur }
}
