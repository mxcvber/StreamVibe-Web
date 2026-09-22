import Link from 'next/link'

import { PlayIcon } from '@/components/icons/play'
import { PlusIcon } from '@/components/icons/plus'
import { ThumbsUpIcon } from '@/components/icons/thumbs-up'
import { VolumeIcon } from '@/components/icons/volume'
import { Button } from '@/components/ui/button'
import type { Movie } from '@/data/movies'

/**
 * Play Now plus the add / like / sound icon buttons. The mobile artboard
 * stacks them with a full-width CTA; laptop and desktop put them in a row.
 * The row starts at `md` rather than `lg` because a full-width CTA across a
 * 700–900px tablet frame looks wrong. The icon buttons are placeholders until
 * watchlists, ratings and trailers exist.
 */
export function HeroActions({ slug }: { slug: Movie['slug'] }) {
  return (
    <div className='flex w-full flex-col gap-5 md:w-auto md:flex-row md:items-center'>
      {/* The movie page's route; it 404s until that page lands, like the other
          links the design pre-wires. */}
      <Button asChild size='lg' className='w-full md:w-auto'>
        <Link href={`/movies/${slug}`}>
          <PlayIcon />
          Play Now
        </Link>
      </Button>
      <div className='flex items-center justify-center gap-2 2xl:gap-2.5'>
        <Button type='button' variant='surface' size='icon-lg' aria-label='Add to watchlist'>
          <PlusIcon />
        </Button>
        <Button type='button' variant='surface' size='icon-lg' aria-label='Like'>
          <ThumbsUpIcon />
        </Button>
        <Button type='button' variant='surface' size='icon-lg' aria-label='Toggle sound'>
          <VolumeIcon />
        </Button>
      </div>
    </div>
  )
}
