import Link from 'next/link'
import React from 'react'
import { Card } from './ui/card'
import { cn } from 'cn'

interface CardWrapperProps {
  href: string
  children: React.ReactNode
  className?: string
}

const CardWrapper = ({ href, children, className }: CardWrapperProps) => {
  return (
    <Link href={href} className='group block rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50'>
      <Card className={cn('transition-colors group-hover:border-black-20', className)}>{children}</Card>
    </Link>
  )
}

export default CardWrapper
