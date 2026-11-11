import type { HeroMovie } from "@/types/movies-hero"
import Link from "next/link"
import { PlayIcon } from "@/components/icons/play"
import { PlusIcon } from "@/components/icons/plus"
import { Button } from "@/components/shared/ui/button"

export function HeroActions({ slug }: { slug: HeroMovie["id"] }) {
  return (
    <div className="flex w-auto items-center gap-5">
      <Button asChild size="lg" className="w-auto">
        <Link href={`/movies/${slug}`}>
          <PlayIcon />
          Play Now
        </Link>
      </Button>

      <Button type="button" variant="surface" size="icon-lg" aria-label="Add to watchlist">
        <PlusIcon />
      </Button>
    </div>
  )
}
