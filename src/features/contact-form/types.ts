import type { Control } from "react-hook-form"
import { SupportMessage, SupportMessageInput } from "./schemas"
import { COUNTRY_CODES } from "./data"
import { FlagComponent } from "country-flag-icons/react/3x2"

/** The contact form's `control`, as its field components receive it. */
export type ContactFormControl = Control<SupportMessageInput, unknown, SupportMessage>

export type Country = {
  code: (typeof COUNTRY_CODES)[number]
  name: string
  Flag: FlagComponent
}
