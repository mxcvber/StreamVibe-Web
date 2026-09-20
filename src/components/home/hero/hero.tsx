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
          The negative margin lets the copy below overlap the fade by 64px. */}
      <div className='relative -mb-16 h-215 w-full overflow-hidden'>
        <PosterMosaic
          rows={heroPosterRows}
          sizes='(min-width: 1920px) 196px, 10vw'
          tileClassName='rounded-lg'
          className='h-full'
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
        <div className='absolute inset-x-0 top-0 h-145.25 bg-linear-to-b from-background to-background/0' />
        <div className='absolute inset-x-0 bottom-0 h-145.25 bg-linear-to-t from-background to-background/0' />
        <HeroPlayGraphic className='absolute top-1/2 left-1/2 size-117.5 -translate-x-1/2 -translate-y-1/2' />
      </div>

      <div className='relative flex w-full max-w-274 flex-col items-center gap-12.5 text-center'>
        <div className='flex flex-col gap-3.5'>
          <h1 className='text-58 font-bold'>The Best Streaming Experience</h1>
          <p className='text-18 text-muted-foreground'>
            StreamVibe is the best streaming experience for watching your favorite movies on demand, anytime, anywhere.
            With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies,
            and more. You can also create your own watchlists, so you can easily find the content you want to watch.
          </p>
        </div>
        <Button asChild>
          <Link href='/movies'>
            <PlayIcon className='size-7' />
            Start Watching Now
          </Link>
        </Button>
      </div>
    </section>
  )
}
