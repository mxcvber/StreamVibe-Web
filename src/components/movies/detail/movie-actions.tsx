import { BookmarkIcon } from '@/components/icons/bookmark'
import { PlayIcon } from '@/components/icons/play'
import { Button } from '@/components/ui/button'

/**
 * Play Now and Add to bookmarks: the artboards' add / like / sound icon
 * buttons cut down to the bookmark. With one icon button left, mobile keeps
 * both on one row (Play Now stretching beside the square) rather than the
 * artboard's full-width CTA over a row of three; from `md` they form a
 * centred row, as on the Movies hero.
 *
 * Both are placeholders: Play Now until there is a player, the bookmark until
 * sign-in and a bookmarks endpoint exist.
 */
export function MovieActions() {
  return (
    <div className='flex w-full items-center gap-5 md:w-auto'>
      <Button type='button' size='lg' className='flex-1 md:flex-none'>
        <PlayIcon />
        Play Now
      </Button>
      <Button type='button' variant='surface' size='icon-lg' aria-label='Add to bookmarks'>
        <BookmarkIcon />
      </Button>
    </div>
  )
}
