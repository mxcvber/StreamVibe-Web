'use client'

import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { BellIcon } from '@/components/icons/bell'
import { SearchIcon } from '@/components/icons/search'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { siteConfig } from '@/config/site'
import { isActive } from '@/lib/nav'
import { cn } from '@/lib/utils'

/**
 * The phone header's menu: Figma's 48px hamburger button opening a drawer
 * with the same links as the nav pill (the open state is not designed, so
 * the drawer is a plain list). Links close the drawer as they navigate.
 *
 * TODO: the hamburger glyph is lucide's `Menu` until the Figma export
 * (node 291:4952) can be fetched.
 */
export function MobileNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' size='icon' aria-label='Open menu' className={cn('p-2.75', className)}>
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side='right' aria-describedby={undefined} className='gap-0 border-black-12'>
        <SheetTitle className='sr-only'>Menu</SheetTitle>
        <nav aria-label='Main' className='mt-16 px-4'>
          <ul className='flex flex-col gap-1'>
            {siteConfig.mainNav.map((item) => {
              const active = isActive(pathname, item.href)

              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'block rounded-sm px-4 py-3 text-18 font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                        active ? 'bg-secondary text-foreground' : 'text-grey-75 hover:text-foreground',
                      )}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                </li>
              )
            })}
          </ul>
        </nav>

        <SheetFooter className='flex-row gap-2.5'>
          <Button variant='secondary' size='icon' aria-label='Search'>
            <SearchIcon />
          </Button>
          <Button variant='secondary' size='icon' aria-label='Notifications'>
            <BellIcon />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
