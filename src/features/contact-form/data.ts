import { AU, BR, CA, DE, ES, FR, GB, IN, JP, US } from 'country-flag-icons/react/3x2'

export type Country = {
  code: (typeof COUNTRY_CODES)[number]
  name: string
  Flag: typeof IN
}

/**
 * Countries offered by the support form's dial-code picker, in menu order.
 * A short curated list rather than every country: the flags are bundled per
 * import, and a ~240-item menu would need a searchable combobox. Codes are
 * ISO 3166-1 alpha-2, which is what libphonenumber-js validates against.
 */
export const COUNTRY_CODES = ['IN', 'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'ES', 'BR', 'JP'] as const

/** The Figma artboards show India's flag in the phone field. */
export const DEFAULT_COUNTRY: Country['code'] = 'IN'

export const countries: Country[] = [
  { code: 'IN', name: 'India', Flag: IN },
  { code: 'US', name: 'United States', Flag: US },
  { code: 'GB', name: 'United Kingdom', Flag: GB },
  { code: 'CA', name: 'Canada', Flag: CA },
  { code: 'AU', name: 'Australia', Flag: AU },
  { code: 'DE', name: 'Germany', Flag: DE },
  { code: 'FR', name: 'France', Flag: FR },
  { code: 'ES', name: 'Spain', Flag: ES },
  { code: 'BR', name: 'Brazil', Flag: BR },
  { code: 'JP', name: 'Japan', Flag: JP },
]

export function findCountry(code: Country['code']): Country | undefined {
  return countries.find((country) => country.code === code)
}
