import Image from "next/image"
import { HeroActions } from "./hero-actions"
import { HeroMovie } from "@/types/movies-hero"

interface HeroSlideProps {
  movie: HeroMovie
  priority?: boolean
}

export function HeroSlide({ movie, priority = false }: HeroSlideProps) {
  return (
    <div className="relative flex h-117 flex-col items-center justify-end px-6 pt-6 pb-4 lg:h-177.25 lg:px-10 lg:pt-10 lg:pb-26 2xl:h-208.75 2xl:px-12.5 2xl:pt-12.5 2xl:pb-31.5">
      <Image
        src={movie.backdropSrc}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1756px) 1596px, (min-width: 1024px) calc(100vw - 160px), (min-width: 768px) calc(100vw - 80px), calc(100vw - 32px)"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-background to-background/0" />

      <div className="relative flex w-full flex-col items-center gap-5 lg:gap-6 2xl:gap-7.5">
        <div className="flex flex-col items-center gap-0.5 text-center lg:max-w-240 2xl:max-w-298.5 2xl:gap-1">
          <h2 className="text-24 font-bold lg:text-30 2xl:text-38">{movie.title}</h2>

          <p className="hidden text-16 font-medium text-muted-foreground sm:line-clamp-2 2xl:text-18">
            {movie.overview}
          </p>
        </div>

        <HeroActions slug={movie.id} />
      </div>
    </div>
  )
}
