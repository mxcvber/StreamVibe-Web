"use client"

import type { ContactFormControl } from "@/features/contact-form/types"
import { Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/shared/ui/field"
import { Input } from "@/components/shared/ui/input"
import { PhoneSelect } from "./phone-select"

const ID = "contact-phone"

export function PhoneField({ control }: { control: ContactFormControl }) {
  return (
    <Controller
      name="phone"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={ID}>Phone Number</FieldLabel>

          <div className="flex gap-3 2xl:gap-4">
            <Controller
              name="phoneCountry"
              control={control}
              // The number is valid or not per country, so re-check it when
              // the country changes (once the form validates on change).
              rules={{ deps: "phone" }}
              render={({ field: country }) => <PhoneSelect country={country} />}
            />

            <Input
              {...field}
              id={ID}
              type="tel"
              autoComplete="tel-national"
              placeholder="Enter Phone Number"
              aria-invalid={fieldState.invalid}
            />
          </div>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}
