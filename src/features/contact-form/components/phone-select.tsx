"use client"

import type { Country } from "@/features/contact-form/types"
import type { SupportMessageInput } from "@/features/contact-form/schemas"
import type { ControllerRenderProps } from "react-hook-form"
import { getCountryCallingCode } from "libphonenumber-js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/shared/ui/select"
import { countries } from "@/features/contact-form/data"
import { CountryFlag } from "@/features/contact-form/components/country-flag"
import { Fragment } from "react"

function findCountry(code: Country["code"]): Country | undefined {
  return countries.find((country) => country.code === code)
}

interface PhoneSelectProps {
  country: ControllerRenderProps<SupportMessageInput, "phoneCountry">
}

export function PhoneSelect({ country }: PhoneSelectProps) {
  const selected = findCountry(country.value)

  return (
    <Select name={country.name} value={country.value} onValueChange={country.onChange}>
      <SelectTrigger
        ref={country.ref}
        onBlur={country.onBlur}
        aria-label="Country code"
        className="self-stretch px-1.75 py-0 2xl:px-2.75 2xl:py-0"
      >
        <SelectValue>
          {selected && (
            <Fragment>
              <CountryFlag country={selected} className="h-6 w-9 lg:w-9.5 2xl:h-6.5 2xl:w-10" />

              <span className="sr-only">
                {selected.name} +{getCountryCallingCode(selected.code)}
              </span>
            </Fragment>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent position="popper" align="start">
        {countries.map((item) => (
          <SelectItem key={item.code} value={item.code}>
            <CountryFlag country={item} className="h-4 w-6" />
            {item.name}
            <span className="text-muted-foreground">+{getCountryCallingCode(item.code)}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
