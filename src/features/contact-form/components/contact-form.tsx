"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { sendSupportMessage } from "@/features/contact-form/actions"
import { DEFAULT_COUNTRY } from "@/features/contact-form/data"
import { FormContent } from "./form-content"
import { SupportMessage, SupportMessageInput, supportMessageSchema } from "../schemas"
import { toast } from "sonner"

export function ContactForm() {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<SupportMessageInput, unknown, SupportMessage>({
    resolver: zodResolver(supportMessageSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneCountry: DEFAULT_COUNTRY,
      phone: "",
      message: "",
      agreeToTerms: true,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const result = await sendSupportMessage(values)

      if (result.ok) {
        reset()
        toast.success("Thanks for reaching out! We'll get back to you soon.")
        return
      }

      // The server re-validates; show anything it rejected on its field.
      for (const name of Object.keys(result.fieldErrors) as (keyof SupportMessageInput)[]) {
        const message = result.fieldErrors[name]?.[0]
        if (message) setError(name, { message })
      }
    } catch (error) {
      console.error("Failed to send the support message", error)
      toast.error("Something went wrong. Please try again.")
    }
  })

  return <FormContent control={control} onSubmit={onSubmit} loading={isSubmitting} />
}
