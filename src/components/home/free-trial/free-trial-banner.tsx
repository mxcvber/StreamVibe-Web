import Link from 'next/link'

import { PosterMosaic } from '@/components/home/hero/poster-mosaic'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { heroPosterRows } from '@/data/posters'

export function FreeTrialBanner() {
  return (
    <section>
      <Container>
        <div className='relative flex flex-col items-center gap-12.5 overflow-hidden rounded-lg border bg-black-06 px-7.25 py-12.25 text-center md:flex-row md:gap-25 md:text-left lg:px-14.75 lg:py-19.75 2xl:px-19.75 2xl:py-24.75'>
          {/* The hero mosaic again, oversized and centred (shifted 25px right
              on desktop), fading out towards the left so the copy stays
              readable. Its box is the artboards': 1395×693, 1281×355, 1646×395. */}
          <div
            aria-hidden='true'
            className='absolute top-1/2 left-1/2 h-173.25 w-348.75 -translate-x-1/2 -translate-y-1/2 lg:h-88.75 lg:w-320.25 2xl:left-[calc(50%+25px)] 2xl:h-98.75 2xl:w-[1646px]'
          >
            <PosterMosaic rows={heroPosterRows} sizes='170px' className='h-full' />
            <div className='absolute inset-0 bg-[linear-gradient(90deg,#0f0f0f_2.4%,rgba(20,15,15,0.975)_25%,rgba(34,14,14,0.91)_47%,rgba(229,0,0,0)_169%)]' />
          </div>

          <div className='relative flex flex-1 flex-col gap-2.5 2xl:gap-3.5'>
            <h2 className='text-24 font-bold lg:text-28 2xl:text-48'>Start your free trial today!</h2>
            <p className='text-14 text-muted-foreground lg:text-16 2xl:text-18'>
              This is a clear and concise call to action that encourages users to sign up for a free trial of
              StreamVibe.
            </p>
          </div>
          <Button asChild className='relative'>
            <Link href='/subscriptions?trial=true'>Start a Free Trial</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
