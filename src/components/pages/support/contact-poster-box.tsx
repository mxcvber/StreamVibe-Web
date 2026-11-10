import { PosterMosaic } from '@/components/shared/poster-mosaic'
import { posterMosaic } from '@/lib/poster-mosaic'
import { cn } from '@/lib/utils'

/**
 * The framed poster collage under the support intro: a Black/06 box with a
 * 6px Black/15 frame, cropping a grid of 12px-rounded posters.
 *
 * Figma draws the frame as an outside stroke; here it's a border, so the box's
 * outer edge lines up with the heading. The outer radius (10px, 12px on
 * desktop) leaves the artboards' 4px / 6px inner corners.
 *
 * The artboards show the first four columns of the hero mosaic. The box is
 * fluid, though (up to ~940px wide on tablets, and as tall as the form from
 * `lg`), so the full nine-column rows are laid out at the artboards' tile size
 * and the box crops them. That matches the three artboards exactly and fills
 * every width between them. Tiles are 97×122px (135×168px on desktop), with
 * the grid's left edge at the artboards' −49 / −13 / −37px. Vertically it sits
 * 10px above centre, as in all three artboards, which also keeps it covering
 * the box when error messages make the form (and so the box) taller.
 */
export function ContactPosterBox({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md border-6 border-black-15 bg-black-06 2xl:rounded-lg',
        className,
      )}
    >
      <PosterMosaic
        rows={posterMosaic(4, 9)}
        sizes='(min-width: 1536px) 136px, 98px'
        tileClassName='rounded-lg'
        className='absolute top-1/2 -left-12.25 -mt-2.5 h-136.75 w-258.75 -translate-y-1/2 lg:-left-3.25 2xl:-left-9.25 2xl:h-183.25 2xl:w-344.25'
      />
    </div>
  )
}
