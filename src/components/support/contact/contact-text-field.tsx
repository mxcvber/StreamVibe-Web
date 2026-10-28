'use client'

import { Controller } from 'react-hook-form'

import type { ContactFormControl } from '@/components/support/contact/contact-form-control'
import { Field, FieldError, FieldLabel } from '@/components/shared/ui/field'
import { Input } from '@/components/shared/ui/input'
import { Textarea } from '@/components/shared/ui/textarea'

type ContactTextFieldProps = {
  control: ContactFormControl
  name: 'firstName' | 'lastName' | 'email' | 'message'
  label: string
  placeholder: string
  type?: 'text' | 'email'
  autoComplete?: string
  /** Render a textarea (the message box) instead of a one-line input. */
  multiline?: boolean
  className?: string
}

/** A labelled text field of the contact form, with its validation message. */
export function ContactTextField({
  control,
  name,
  label,
  placeholder,
  type = 'text',
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
