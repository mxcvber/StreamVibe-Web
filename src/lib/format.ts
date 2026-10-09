/**
 * A runtime in minutes as the cards show it: "1h 30min", "2h" or "45min", or
 * "1h 30m" / "45m" with the short unit for narrow cards.
 */
export function formatRuntime(minutes: number, unit: 'long' | 'short' = 'long') {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  const min = unit === 'long' ? 'min' : 'm'

  if (hours === 0) return `${rest}${min}`
  if (rest === 0) return `${hours}h`
  return `${hours}h ${rest}${min}`
}

// Compact's default rounding keeps a decimal only below 10 of a unit ("1.5K",
// but "41K" rather than "41.2K"), which keeps the chips as narrow as the
// designs' "20K".
const compactNumber = new Intl.NumberFormat('en', { notation: 'compact' })

/** A view or vote count shortened like the designs: "1.5K", "41K", "1.2M". */
export function formatCount(count: number) {
  return compactNumber.format(count)
}

// UTC on both ends: a "YYYY-MM-DD" string parses as UTC midnight, so formatting
// in the server's local zone could show the day before.
const shortDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

/**
 * A "YYYY-MM-DD" calendar date as the cards show it: "30 Sept 2026". The
 * month is short because a long one ("September") doesn't fit the cards.
 */
export function formatReleaseDate(isoDate: string) {
  return shortDate.format(new Date(isoDate))
}
