'use client'

import { Controller } from 'react-hook-form'

import type { ContactFormControl } from '@/components/support/contact/contact-form-control'
import { Checkbox } from '@/components/shared/ui/checkbox'
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/shared/ui/field'
import { cn } from '@/lib/utils'

const ID = 'contact-terms'

/**
 * The consent checkbox. Its label is plain grey body text in the design
 * (16px, 18px on desktop), 8px from the box (10px on desktop), and its
 * validation message sits under the label.
 */
export function TermsField({ control, className }: { control: ContactFormControl; className?: string }) {
  return (
    <Controller
      name='agreeToTerms'
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation='horizontal'
          data-invalid={fieldState.invalid}
          className={cn('gap-2 2xl:gap-2.5', className)}
        >
          <Checkbox
            ref={field.ref}
            id={ID}
            name={field.name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked === true)}
            onBlur={field.onBlur}
            aria-invalid={fieldState.invalid}
          />
          <FieldContent>
            <FieldLabel htmlFor={ID} className='font-normal text-muted-foreground'>
              I agree with Terms of Use and Privacy Policy
            </FieldLabel>
            <FieldError errors={[fieldState.error]} />
          </FieldContent>
        </Field>
      )}
    />
  )
}
