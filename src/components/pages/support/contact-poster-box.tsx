import { PosterMosaic } from "@/components/shared/poster-mosaic"
import { posterMosaic } from "@/lib/poster-mosaic"
import { cn } from "@/lib/utils"

export function ContactPosterBox({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border-6 border-black-15 bg-black-06 2xl:rounded-lg",
        className,
      )}
    >
      <PosterMosaic
        rows={posterMosaic(4, 4)}
        sizes="(min-width: 1536px) 135px, (min-width: 1280px) 95px, (min-width: 1024px) 70px, (min-width: 640px) 135px, 60px"
        tileClassName="rounded-lg"
        className="absolute top-1/2 left-1/2 h-112.5 w-75 -translate-x-1/2 -translate-y-1/2 sm:h-225 sm:w-150 lg:h-127.5 lg:w-85 xl:h-165 xl:w-110 2xl:h-225 2xl:w-150"
        loading="eager"
        quality={100}
      />
    </div>
  )
}
