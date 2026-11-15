import { Card } from "@/components/shared/ui/card"
import { Skeleton } from "@/components/shared/ui/skeleton"
import { CatalogRowHeading } from "../catalog-row-heading"

const PLACEHOLDERS = 5

export function NewReleasesRowSkeleton() {
  return (
    <div className="flex flex-col gap-5 lg:gap-10 2xl:gap-12.5">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:gap-25">
        <CatalogRowHeading>New Releases</CatalogRowHeading>

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
        <div className="-ml-5 flex overflow-hidden">
          {Array.from({ length: PLACEHOLDERS }, (_, index) => (
            <div key={index} className="min-w-0 shrink-0 grow-0 basis-[198.4px] pl-5 md:basis-61 lg:basis-1/5">
              <Card className="items-center gap-3 rounded-md p-2.75 lg:gap-4 lg:p-3.75 2xl:items-stretch 2xl:gap-5 2xl:rounded-lg 2xl:p-4.75">
                <Skeleton className="aspect-[154.4/193] w-full rounded-md lg:aspect-192/230 2xl:aspect-[243.6/281] 2xl:rounded-lg" />

                <Skeleton className="h-7.5 w-36 max-w-full rounded-full 2xl:h-9 2xl:w-auto" />
              </Card>
            </div>
          ))}
        </div>

        <Skeleton className="mx-auto h-1.25 w-19.75 rounded-full lg:hidden" />
      </div>
    </div>
  )
}
