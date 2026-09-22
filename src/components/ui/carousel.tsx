'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'

import { ArrowLeftIcon } from '@/components/icons/arrow-left'
import { ArrowRightIcon } from '@/components/icons/arrow-right'
import { Button } from '@/components/ui/button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: 'horizontal' | 'vertical'
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

// Embla is an external store: components subscribe to its selection events and
// read the scroll state directly instead of mirroring it into React state from
// an effect. Shared by Carousel and CarouselDots.
function subscribeToSelection(api: CarouselApi, onStoreChange: () => void) {
  if (!api) return () => {}
  api.on('select', onStoreChange)
  api.on('reInit', onStoreChange)
  return () => {
    api.off('select', onStoreChange)
    api.off('reInit', onStoreChange)
  }
}

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins,
  )
  const subscribe = React.useCallback((onStoreChange: () => void) => subscribeToSelection(api, onStoreChange), [api])
  const canScrollPrev = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false,
  )
  const canScrollNext = React.useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false,
  )

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext],
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        data-slot='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className='overflow-hidden' data-slot='carousel-content'>
      <div className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props} />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel()

  return (
    <div
      role='group'
      aria-roledescription='slide'
      data-slot='carousel-item'
      className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
      {...props}
    />
  )
}

// Prev/next are ordinary flow items so they can sit in the design's control
// cluster beside the section heading rather than on the carousel's edges.
function CarouselPrevious({
  className,
  variant = 'secondary',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot='carousel-previous'
      variant={variant}
      size={size}
      className={cn('touch-manipulation cursor-pointer', orientation === 'vertical' && 'rotate-90', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon />
      <span className='sr-only'>Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = 'secondary',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot='carousel-next'
      variant={variant}
      size={size}
      className={cn('touch-manipulation cursor-pointer', orientation === 'vertical' && 'rotate-90', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon />
      <span className='sr-only'>Next slide</span>
    </Button>
  )
}

type CarouselDotsProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  /** Width of the active dot, e.g. `w-4.5 2xl:w-5.75`; the others share what's left. */
  activeClassName?: string
  /** Accessible name for each dot. */
  label?: (index: number, count: number) => string
}

// One pill per scroll snap, the active one wider and red, the rest sharing the
// remaining width. Defaults are the Movies hero indicator (81×4px, 3px gaps,
// 23px active dot); the categories carousel narrows it via className.
function CarouselDots({
  className,
  activeClassName = 'w-5.75',
  label = (index, count) => `Slide ${index + 1} of ${count}`,
  ...props
}: CarouselDotsProps) {
  const { api } = useCarousel()
  const subscribe = React.useCallback((onStoreChange: () => void) => subscribeToSelection(api, onStoreChange), [api])
  const count = React.useSyncExternalStore(
    subscribe,
    () => api?.scrollSnapList().length ?? 0,
    () => 0,
  )
  const selected = React.useSyncExternalStore(
    subscribe,
    () => api?.selectedScrollSnap() ?? 0,
    () => 0,
  )

  return (
    <div
      role='group'
      aria-label='Slides'
      data-slot='carousel-dots'
      className={cn('flex w-20.25 items-center gap-0.75', className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type='button'
          aria-current={index === selected ? 'true' : undefined}
          aria-label={label(index, count)}
          onClick={() => api?.scrollTo(index)}
          className={cn(
            // An invisible ::before takes each 4px pill to a 24px-tall target
            // without changing the layout box, the same trick as
            // `CarouselProgress`. The 1.5px inline inset is half the row's 3px
            // gap, so neighbouring targets meet without overlapping; it is an
            // arbitrary value because the spacing scale only steps by 0.25.
            'relative h-1 rounded-full transition-colors outline-none before:absolute before:-inset-x-[1.5px] before:-inset-y-2.5 focus-visible:ring-3 focus-visible:ring-ring/50',
            index === selected ? cn('bg-primary', activeClassName) : 'flex-1 bg-black-20',
          )}
        />
      ))}
    </div>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  useCarousel,
}
