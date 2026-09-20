'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}

/**
 * The centred navigation pill. Matches Figma literally: the active item is a
 * filled button while the others are plain text, and the pill's padding is
 * asymmetric (10px left, 40px right) on every page of the design.
 */
export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label='Main'
      className={cn('flex items-center gap-7.5 rounded-lg border-4 border-black-12 bg-black-06 p-1.5', className)}
    >
      {siteConfig.mainNav.map((item) => {
        const active = isActive(pathname, item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={
              active
                ? cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'border-transparent')
                : 'rounded-sm text-18 text-grey-75 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50'
            }
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
