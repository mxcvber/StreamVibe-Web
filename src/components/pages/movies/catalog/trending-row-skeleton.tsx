import { Skeleton } from "@/components/shared/ui/skeleton"
import { MovieRowSkeleton } from "./movie-row-skeleton"

/** Stands in for `TrendingRow` while the API responds. */
export function TrendingRowSkeleton() {
  return (
    <MovieRowSkeleton
      variant="trending"
      chips={
        // The runtime and views chips: 28px tall, 36px on desktop.
        <div className="flex justify-between gap-2">
          <Skeleton className="h-7 w-20 rounded-full 2xl:h-9 2xl:w-27" />
          <Skeleton className="h-7 w-14 rounded-full 2xl:h-9 2xl:w-18" />
        </div>
      }
    />
  )
}
