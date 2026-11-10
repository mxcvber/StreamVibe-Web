"use client"

import { Controller } from "react-hook-form"

import { Checkbox } from "@/components/shared/ui/checkbox"
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/shared/ui/field"
import { cn } from "@/lib/utils"
import { ContactFormControl } from "../types"

const ID = "contact-terms"

export function TermsField({ control, className }: { control: ContactFormControl; className?: string }) {
  return (
    <Controller
      name="agreeToTerms"
      control={control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          data-invalid={fieldState.invalid}
          className={cn("gap-2 2xl:gap-2.5", className)}
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
            <FieldLabel htmlFor={ID} className="font-normal text-muted-foreground">
              I agree with Terms of Use and Privacy Policy
            </FieldLabel>

            <FieldError errors={[fieldState.error]} />
          </FieldContent>
        </Field>
      )}
    />
  )
}
