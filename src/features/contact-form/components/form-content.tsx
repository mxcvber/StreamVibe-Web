"use client"

import type { ContactFormControl } from "../types"
import { Button } from "@/components/shared/ui/button"
import { ContactTextField } from "./contact-text-field"
import { TermsField } from "./terms-field"
import { PhoneField } from "./phone-field"

interface FormContentProps {
  onSubmit: (event: React.BaseSyntheticEvent) => Promise<void | undefined>
  control: ContactFormControl
  loading: boolean
}

export function FormContent({ onSubmit, control, loading }: FormContentProps) {
  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="grid gap-5 rounded-md border bg-black-06 p-5.75 md:grid-cols-2 lg:gap-x-5 lg:gap-y-10 lg:p-9.75 2xl:gap-12.5 2xl:rounded-lg 2xl:p-12.25"
    >
      <ContactTextField
        control={control}
        name="firstName"
        label="First Name"
        placeholder="Enter First Name"
        autoComplete="given-name"
      />
      <ContactTextField
        control={control}
        name="lastName"
        label="Last Name"
        placeholder="Enter Last Name"
        autoComplete="family-name"
      />
      <ContactTextField
        control={control}
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your Email"
        autoComplete="email"
      />
      <PhoneField control={control} />
      <ContactTextField
        control={control}
        name="message"
        label="Message"
        placeholder="Enter your Message"
        multiline
        className="md:col-span-2"
      />

      <div className="flex flex-col md:col-span-2">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-17.5">
          <TermsField control={control} className="md:flex-1" />

          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            Send Message
          </Button>
        </div>
      </div>
    </form>
  )
}
