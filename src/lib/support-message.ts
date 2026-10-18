import { isValidPhoneNumber } from 'libphonenumber-js'
import { z } from 'zod'

import { COUNTRY_CODES } from '@/data/countries'

/**
 * The support page's contact form. One schema serves both sides: the form
 * validates with it in the browser (`zodResolver`), and `sendSupportMessage`
 * parses the same payload again on the server, because anyone can POST to a
 * Server Action. So this module is neither `'use client'` nor `server-only`.
 */
const fields = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name').max(50, 'Keep it under 50 characters'),
  lastName: z.string().trim().min(1, 'Enter your last name').max(50, 'Keep it under 50 characters'),
  email: z.string().trim().min(1, 'Enter your email').pipe(z.email('Enter a valid email address')),
  phoneCountry: z.enum(COUNTRY_CODES),
  // Optional: an empty string means no phone number.
  phone: z.string().trim().max(30, 'Enter a valid phone number'),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more (at least 10 characters)')
    .max(1000, 'Keep your message under 1,000 characters'),
  // A boolean rather than `z.literal(true)` so the form can start unchecked.
  agreeToTerms: z.boolean().refine((agreed) => agreed, 'Please accept the Terms of Use and Privacy Policy'),
})

const phoneFields = fields.pick({ phone: true, phoneCountry: true })

export const supportMessageSchema = fields.refine(
  ({ phone, phoneCountry }) => phone === '' || isValidPhoneNumber(phone, phoneCountry),
  {
    path: ['phone'],
    message: 'Enter a valid phone number for the selected country',
    // Zod skips object-level checks while any field is invalid; run this one
    // as soon as the two fields it reads are valid, so a bad number is
    // reported together with the other errors.
    when: (payload) => phoneFields.safeParse(payload.value).success,
  },
)

export type SupportMessageInput = z.input<typeof supportMessageSchema>
export type SupportMessage = z.output<typeof supportMessageSchema>

export type SupportMessageResult =
  | { ok: true }
  | { ok: false; fieldErrors: Partial<Record<keyof SupportMessageInput, string[]>> }
