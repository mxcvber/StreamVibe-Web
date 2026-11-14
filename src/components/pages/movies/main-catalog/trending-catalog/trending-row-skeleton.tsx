import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowHeading } from "../catalog-row-heading"

const PLACEHOLDERS = 5

export function TrendingRowSkeleton() {
  return (
    <div className="flex flex-col gap-5 lg:gap-10 2xl:gap-12.5">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-25">
        <CatalogRowHeading>Trending Now</CatalogRowHeading>

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
        <div className="-ml-4 flex overflow-hidden lg:-ml-5">
          {Array.from({ length: PLACEHOLDERS }, (_, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-[197.6px] pl-4 md:basis-60 lg:basis-1/5 lg:pl-5">
              <Card className="gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75">
                <Skeleton className="aspect-[157.6/195] rounded-md lg:aspect-192/232 2xl:aspect-[243.6/281] 2xl:rounded-lg" />

                <div className="flex items-center gap-1">
                  <Skeleton className="h-7 w-20 rounded-full 2xl:h-9 2xl:w-27" />
                  <Skeleton className="ml-auto h-7 w-14 rounded-full 2xl:h-9 2xl:w-18" />
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
