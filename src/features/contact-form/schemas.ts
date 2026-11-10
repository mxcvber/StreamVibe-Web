import { isValidPhoneNumber } from "libphonenumber-js"
import { z } from "zod"
import { COUNTRY_CODES } from "@/features/contact-form/data"

const fields = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty("Enter your first name")
    .min(3, "First name must be at least 3 characters")
    .max(30, "Keep it under 30 characters"),
  lastName: z
    .string()
    .trim()
    .nonempty("Enter your last name")
    .min(3, "Last name must be at least 3 characters")
    .max(30, "Keep it under 30 characters"),
  email: z.string().trim().nonempty("Enter your email").pipe(z.email("Enter a valid email address")),
  phoneCountry: z.enum(COUNTRY_CODES),
  phone: z.string().trim().max(30, "Enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters)")
    .max(1000, "Keep your message under 1,000 characters"),
  agreeToTerms: z.boolean().refine((agreed) => agreed, "Please accept the Terms of Use and Privacy Policy"),
})

const phoneFields = fields.pick({ phone: true, phoneCountry: true })

export const supportMessageSchema = fields.refine(
  ({ phone, phoneCountry }) => phone === "" || isValidPhoneNumber(phone, phoneCountry),
  {
    path: ["phone"],
    message: "Enter a valid phone number for the selected country",

    // Zod skips object-level checks while any field is invalid; run this one
    // as soon as the two fields it reads are valid, so a bad number is
    // reported together with the other errors.
    when: (payload) => phoneFields.safeParse(payload.value).success,
  },
)

export type SupportMessageInput = z.input<typeof supportMessageSchema>
export type SupportMessage = z.output<typeof supportMessageSchema>

export type SupportMessageResult =
  { ok: true } | { ok: false; fieldErrors: Partial<Record<keyof SupportMessageInput, string[]>> }
