'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { buttonVariants } from '@/components/shared/ui/button'
import { siteConfig } from '@/data/site-config'
import { isActive } from '@/lib/nav'
import { cn } from '@/lib/utils'

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label='Main'
      className={cn(
        'flex items-center gap-4 rounded-lg border-4 border-black-12 bg-black-06 p-1 2xl:gap-7.5 2xl:p-1.5',
        className,
      )}
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
                : 'rounded-sm text-14 text-grey-75 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 2xl:text-18'
            }
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
