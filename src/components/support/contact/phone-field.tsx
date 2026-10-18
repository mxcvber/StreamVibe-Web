'use client'

import { getCountryCallingCode } from 'libphonenumber-js'
import { Controller } from 'react-hook-form'

import type { ContactFormControl } from '@/components/support/contact/contact-form-control'
import { CountryFlag } from '@/components/support/contact/country-flag'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { countries, findCountry } from '@/data/countries'

const ID = 'contact-phone'

/**
 * "Phone Number": the design's flag-and-chevron box, here a dial-code picker,
 * beside the number input. The two share one validation message, since the
 * number is checked against the selected country.
 *
 * The box shows only the flag, as drawn: 8px side padding, a 4px gap and a
 * 20px chevron (12px, 6px and 24px on desktop), stretched to the input's
 * height. The menu lists each country's name and dial code.
 */
export function PhoneField({ control }: { control: ContactFormControl }) {
  return (
    <Controller
      name='phone'
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={ID}>Phone Number</FieldLabel>
          <div className='flex gap-3 2xl:gap-4'>
            <Controller
              name='phoneCountry'
              control={control}
              // The number is valid or not per country, so re-check it when
              // the country changes (once the form validates on change).
              rules={{ deps: 'phone' }}
              render={({ field: country }) => {
                const selected = findCountry(country.value)

                return (
                  <Select name={country.name} value={country.value} onValueChange={country.onChange}>
                    <SelectTrigger
                      ref={country.ref}
                      onBlur={country.onBlur}
                      aria-label='Country code'
                      className='self-stretch px-1.75 py-0 2xl:px-2.75 2xl:py-0'
                    >
                      <SelectValue>
                        {selected && (
                          <>
                            <CountryFlag country={selected} className='h-6 w-9 lg:w-9.5 2xl:h-6.5 2xl:w-10' />
                            <span className='sr-only'>
                              {selected.name} +{getCountryCallingCode(selected.code)}
                            </span>
                          </>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent position='popper' align='start'>
                      {countries.map((option) => (
                        <SelectItem key={option.code} value={option.code}>
                          <CountryFlag country={option} className='h-4 w-6' />
                          {option.name}
                          <span className='text-muted-foreground'>+{getCountryCallingCode(option.code)}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )
              }}
            />
            <Input
              {...field}
              id={ID}
              type='tel'
              autoComplete='tel-national'
              placeholder='Enter Phone Number'
              aria-invalid={fieldState.invalid}
            />
          </div>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}
