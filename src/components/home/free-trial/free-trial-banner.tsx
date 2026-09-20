import Link from 'next/link'

import { PosterMosaic } from '@/components/home/hero/poster-mosaic'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { heroPosterRows } from '@/data/posters'

export function FreeTrialBanner() {
  return (
    <section>
      <Container>
        <div className='relative flex items-center gap-25 overflow-hidden rounded-lg border bg-black-06 px-19.75 py-24.75'>
          {/* The hero mosaic again, oversized and shifted 25px right, fading
              out towards the left so the copy stays readable. */}
          <div
            aria-hidden='true'
            className='absolute top-1/2 left-[calc(50%+25px)] h-98.75 w-[1646px] -translate-x-1/2 -translate-y-1/2'
          >
            <PosterMosaic rows={heroPosterRows} sizes='170px' className='h-full' />
            <div className='absolute inset-0 bg-[linear-gradient(90deg,#0f0f0f_2.4%,rgba(20,15,15,0.975)_25%,rgba(34,14,14,0.91)_47%,rgba(229,0,0,0)_169%)]' />
          </div>

          <div className='relative flex flex-1 flex-col gap-3.5'>
            <h2 className='text-48 font-bold'>Start your free trial today!</h2>
            <p className='text-18 text-muted-foreground'>
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
