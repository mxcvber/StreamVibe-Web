import Image from 'next/image'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type MovieCardPosterProps = {
  src: string
  /** The movie's title. */
  alt: string
  /** The variant's `sizes` hint. */
  sizes: string
  /** The variant's aspect ratio and radius. */
  className?: string
  /** Drawn over the poster (e.g. a rank badge); position it absolutely. */
  children?: ReactNode
}

/** A movie card's poster, cropped to the frame its variant gives it. */
export function MovieCardPoster({ src, alt, sizes, className, children }: MovieCardPosterProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} className='object-cover' />
      {children}
    </div>
  )
}
