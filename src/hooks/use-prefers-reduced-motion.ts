'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

// Created on first use rather than at module scope, which would run on the
// server; one page has one `window`, so caching it here is safe.
let mediaQuery: MediaQueryList | undefined

function subscribe(onStoreChange: () => void) {
  const query = (mediaQuery ??= window.matchMedia(QUERY))
  query.addEventListener('change', onStoreChange)
  return () => query.removeEventListener('change', onStoreChange)
}

/**
 * Whether the visitor asks for reduced motion, kept live so that flipping the
 * OS setting takes effect without a reload. The server snapshot is `false`:
 * the preference is not knowable while rendering, so markup is built as if
 * motion were allowed and the client corrects it on hydration — which is why
 * callers must treat it as a switch, not as something that changes the tree.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => (mediaQuery ??= window.matchMedia(QUERY)).matches,
    () => false,
  )
}
