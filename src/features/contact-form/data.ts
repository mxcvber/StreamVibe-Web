import type { Country } from "./types"
import { AU, BR, CA, DE, ES, FR, GB, JP, US, CN } from "country-flag-icons/react/3x2"

export const COUNTRY_CODES = ["IN", "US", "GB", "CA", "AU", "DE", "FR", "ES", "BR", "JP", "CN"] as const

export const DEFAULT_COUNTRY: Country["code"] = "CA"

export const countries: Country[] = [
  { code: "US", name: "United States", Flag: US },
  { code: "GB", name: "United Kingdom", Flag: GB },
  { code: "CA", name: "Canada", Flag: CA },
  { code: "AU", name: "Australia", Flag: AU },
  { code: "DE", name: "Germany", Flag: DE },
  { code: "FR", name: "France", Flag: FR },
  { code: "ES", name: "Spain", Flag: ES },
  { code: "BR", name: "Brazil", Flag: BR },
  { code: "JP", name: "Japan", Flag: JP },
  { code: "CN", name: "China", Flag: CN },
]
