import Link from 'next/link'
import { PosterMosaic } from '@/components/shared/poster-mosaic'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/shared/ui/button'
import { posterMosaic } from '@/lib/poster-mosaic'

export function FreeTrialBanner() {
  return (
    <section>
      <Container>
        <div className='py-20 px-7.25 h-125 relative flex flex-col items-center gap-12.5 overflow-hidden rounded-lg border bg-black-06 text-center md:flex-row md:gap-25 md:text-left lg:px-14.75 2xl:px-19.75'>
          <div
            aria-hidden='true'
            className='absolute top-1/2 left-1/2 h-full w-full min-w-desktop -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(90deg,#0f0f0f_2.4%,rgba(20,15,15,0.975)_25%,rgba(34,14,14,0.91)_47%,rgba(229,0,0,0)_169%)]'
          >
            <PosterMosaic
              rows={posterMosaic(2, 9)}
              sizes='160px'
              quality={50}
              className='h-full mask-[linear-gradient(90deg,transparent_2.4%,rgba(0,0,0,0.025)_25%,rgba(0,0,0,0.09)_47%,#000_169%)]'
            />
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
