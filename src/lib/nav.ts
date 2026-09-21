/** Whether a nav link points at the current page (or a page under it). */
export function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
