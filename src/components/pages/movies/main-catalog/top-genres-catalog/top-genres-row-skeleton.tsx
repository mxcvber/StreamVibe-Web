import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowHeading } from "../catalog-row-heading"

const PLACEHOLDERS = 4

export function TopGenresRowSkeleton() {
  return (
    <div className="flex flex-col gap-5 lg:gap-10 2xl:gap-12.5">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-25">
        <CatalogRowHeading>Popular Top 10 In Genres</CatalogRowHeading>

        <div
          aria-hidden="true"
          className="hidden items-center gap-3 rounded-lg border border-black-12 bg-black-06 p-2.75 lg:flex 2xl:gap-4 2xl:p-3.75"
        >
          <Skeleton className="size-11 rounded-sm 2xl:size-14" />
          <Skeleton className="h-1 w-17.25 rounded-full 2xl:w-20.25" />
          <Skeleton className="size-11 rounded-sm 2xl:size-14" />
        </div>
      </div>

      <div aria-hidden="true" className="flex flex-col gap-6">
        <div className="-ml-5 flex overflow-hidden 2xl:-ml-7.5">
          {Array.from({ length: PLACEHOLDERS }, (_, index) => (
            <div key={index} className="shrink-0 grow-0 basis-63 pl-5 md:basis-80 lg:basis-1/4 2xl:pl-7.5">
              <Card className="p-4.75 lg:p-7.25">
                <Skeleton className="aspect-191.75/177 rounded-lg lg:aspect-225/206 2xl:aspect-292/252" />

                <div className="flex flex-col items-start gap-0.5 2xl:gap-1">
                  <Skeleton className="h-6.25 w-18 rounded-lg 2xl:h-8 2xl:w-23" />

                  <div className="flex h-6 w-full items-center 2xl:h-7.5">
                    <Skeleton className="h-6 w-2/4 2xl:h-6" />
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <Skeleton className="mx-auto h-1.25 w-19.75 rounded-full lg:hidden" />
      </div>
    </div>
  )
}
