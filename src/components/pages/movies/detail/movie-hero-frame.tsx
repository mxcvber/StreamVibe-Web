import type { ReactNode } from 'react'

import { Container } from '@/components/shared/container'
import { cn } from '@/lib/utils'

type MovieHeroFrameProps = {
  children: ReactNode
  className?: string
}

/**
 * The movie page's poster frame without its content, shared by the loaded
 * hero, its skeleton and its error message so nothing shifts between them.
 *
 * Placed at the Movies hero's top offset (see `MoviesHero`), which reserves
 * room for the floating `SiteHeader`. Heights are the artboards' 468 / 709 /
 * 835px frames. The inset is 24 / 40 / 50px, with 16 / 16 / 20px at the
 * bottom, where the Movies hero reserves its carousel controls instead.
 */
export function MovieHeroFrame({ children, className }: MovieHeroFrameProps) {
  return (
    <section className='pt-32 lg:pt-34.5 2xl:pt-42.5'>
      <Container>
        <div
          className={cn(
            'relative flex h-117 flex-col items-center justify-end overflow-hidden rounded-lg px-6 pt-6 pb-4 lg:h-177.25 lg:px-10 lg:pt-10 2xl:h-208.75 2xl:px-12.5 2xl:pt-12.5 2xl:pb-5',
            className,
          )}
        >
          {children}

          {/* Figma's 1px Black/15 stroke, as on the Movies hero: fully opaque
              at the top and fading to nothing at the bottom. */}
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-0 rounded-lg border border-black-15 mask-b-from-0%'
          />
        </div>
      </Container>
    </section>
  )
}
