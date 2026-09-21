import Image from 'next/image'
import Link from 'next/link'

import { HeroPlayGraphic } from '@/components/icons/abstract-design'
import { PlayIcon } from '@/components/icons/play'
import { PosterMosaic } from '@/components/home/hero/poster-mosaic'
import { Button } from '@/components/ui/button'
import { heroOverlaySrc, heroPosterRows } from '@/data/posters'

export function Hero() {
  return (
    <section className='flex flex-col items-center'>
      {/* Backdrop: 4×9 poster mosaic, tinted by the wave texture, faded into
          the page background top and bottom, with the play graphic centred.
          The mosaic keeps its Figma box at every artboard — 1286×606 centred
          (wider than a phone, so it overflows both sides), 830px tall on
          laptop, 860 on desktop — and the wrapper crops it to the artboard's
          visible height. The negative margin lets the copy below overlap the
          fade (100px on mobile/laptop, 64px on desktop). */}
      <div className='relative -mb-25 h-125 w-full overflow-hidden lg:h-174.75 2xl:-mb-16 2xl:h-215'>
        <PosterMosaic
          rows={heroPosterRows}
          sizes='(min-width: 1024px) 11vw, 134px'
          tileClassName='rounded-lg'
          className='absolute top-0 left-1/2 h-151.5 w-321.5 -translate-x-1/2 [--mosaic-gap:10px] lg:h-207.5 lg:w-full 2xl:h-full 2xl:[--mosaic-gap:20px]'
          priority
        />
        <Image
          src={heroOverlaySrc}
          alt=''
          fill
          sizes='100vw'
          priority
          className='object-cover opacity-50 mix-blend-overlay'
        />
        <div className='absolute inset-x-0 top-0 h-125 bg-linear-to-b from-background to-background/0 lg:h-145.25' />
        <div className='absolute inset-x-0 bottom-0 h-81 bg-linear-to-t from-background to-background/0 lg:h-145.25' />
        <HeroPlayGraphic className='absolute top-1/2 left-1/2 size-50 -translate-x-1/2 -translate-y-1/2 lg:size-75 2xl:size-117.5' />
      </div>

      {/* Copy width is the artboards' text box plus the page gutters: 1140 + 2×80
          on laptop, 1096 + 2×80 on desktop. */}
      <div className='relative flex w-full max-w-325 flex-col items-center gap-7.5 px-4 text-center lg:gap-10 lg:px-20 2xl:max-w-314 2xl:gap-12.5'>
        <div className='flex flex-col gap-2.5 2xl:gap-3.5'>
          <h1 className='text-28 font-bold lg:text-48 2xl:text-58'>The Best Streaming Experience</h1>
          <p className='text-14 text-muted-foreground 2xl:text-18'>
            StreamVibe is the best streaming experience for watching your favorite movies on demand, anytime, anywhere.
            {/* The mobile artboard keeps only the first sentence. */}
            <span className='hidden lg:inline'>
              {' '}
              With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic
              movies, and more. You can also create your own watchlists, so you can easily find the content you want to
              watch.
            </span>
          </p>
        </div>
        <Button asChild className='px-5.75'>
          <Link href='/movies'>
            <PlayIcon className='size-6 2xl:size-7' />
            Start Watching Now
          </Link>
        </Button>
      </div>
    </section>
  )
}
