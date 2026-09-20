import Image from "next/image";

import { cn } from "@/lib/utils";

type PosterMosaicProps = {
  /** Rows of poster URLs; every row shares the height and every tile the width. */
  rows: string[][];
  /** `sizes` hint for next/image — roughly the rendered tile width. */
  sizes: string;
  className?: string;
  tileClassName?: string;
  /** Eagerly load the first rows (only for the above-the-fold hero). */
  priority?: boolean;
};

/**
 * A grid of cropped posters used as a decorative backdrop by the hero, the
 * category cards and the free-trial banner. Purely decorative, so it is hidden
 * from assistive tech and every image has an empty alt.
 *
 * Gap is driven by `--mosaic-gap` so a caller can set it once on the root
 * (e.g. `[--mosaic-gap:5px]`) instead of on every row.
 */
export function PosterMosaic({
  rows,
  sizes,
  className,
  tileClassName,
  priority = false,
}: PosterMosaicProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex flex-col gap-(--mosaic-gap) [--mosaic-gap:20px]", className)}
    >
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex min-h-0 flex-1 gap-(--mosaic-gap)">
          {row.map((src, columnIndex) => (
            <div
              key={`${rowIndex}-${columnIndex}`}
              className={cn("relative min-w-0 flex-1 overflow-hidden", tileClassName)}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes={sizes}
                priority={priority && rowIndex < 2}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
