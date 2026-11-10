"use client"

import { Controller } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/components/shared/ui/field"
import { Input } from "@/components/shared/ui/input"
import { Textarea } from "@/components/shared/ui/textarea"
import { ContactFormControl } from "@/features/contact-form/types"

type ContactTextFieldProps = {
  control: ContactFormControl
  name: "firstName" | "lastName" | "email" | "message"
  label: string
  placeholder: string
  type?: "text" | "email"
  autoComplete?: string
  multiline?: boolean
  className?: string
}

export function ContactTextField({
  control,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  className,
}: ContactTextFieldProps) {
  const id = `contact-${name}`

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          {multiline ? (
            <Textarea {...field} id={id} placeholder={placeholder} aria-invalid={fieldState.invalid} />
          ) : (
            <Input
              {...field}
              id={id}
              type={type}
              autoComplete={autoComplete}
              placeholder={placeholder}
              aria-invalid={fieldState.invalid}
            />
          )}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}
