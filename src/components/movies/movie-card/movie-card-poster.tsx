import Image from 'next/image'

import { cn } from '@/lib/utils'

type MovieCardPosterProps = {
  src: string
  /** The movie's title. */
  alt: string
  /** The variant's `sizes` hint. */
  sizes: string
  /** The variant's aspect ratio and radius. */
  className?: string
}

/** A movie card's poster, cropped to the frame its variant gives it. */
export function MovieCardPoster({ src, alt, sizes, className }: MovieCardPosterProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className='object-cover' />
    </div>
  )
}
