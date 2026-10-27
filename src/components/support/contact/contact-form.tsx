'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendSupportMessage } from '@/app/(pages)/support/actions'
import { ContactTextField } from '@/components/support/contact/contact-text-field'
import { PhoneField } from '@/components/support/contact/phone-field'
import { TermsField } from '@/components/support/contact/terms-field'
import { Button } from '@/components/ui/button'
import { DEFAULT_COUNTRY } from '@/data/countries'
import { type SupportMessage, type SupportMessageInput, supportMessageSchema } from '@/lib/support-message'
import { cn } from '@/lib/utils'

const STATUS_TEXT = {
  idle: '',
  sent: "Thanks for reaching out! We'll get back to you soon.",
  error: 'Something went wrong. Please try again.',
}

/**
 * The support page's contact form, validated in the browser with the shared
 * Zod schema and sent through the `sendSupportMessage` Server Action.
 *
 * Fields stack on phones and pair up from `md` (the laptop artboard's rows).
 * The card's padding is 24 / 40 / 50px and the field gaps 20 / 20×40 / 50px
 * across the artboards, each padding 1px less for the border.
 *
 * Sending isn't designed, so the outcome is one line of text under the button,
 * in a live region that always exists so screen readers announce it.
 */
export function ContactForm() {
  const [status, setStatus] = useState<keyof typeof STATUS_TEXT>('idle')
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting },
  } = useForm<SupportMessageInput, unknown, SupportMessage>({
    resolver: zodResolver(supportMessageSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneCountry: DEFAULT_COUNTRY,
      phone: '',
      message: '',
      agreeToTerms: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus('idle')
    try {
      const result = await sendSupportMessage(values)
      if (result.ok) {
        reset()
        setStatus('sent')
        return
      }

      // The server re-validates; show anything it rejected on its field.
      for (const name of Object.keys(result.fieldErrors) as (keyof SupportMessageInput)[]) {
        const message = result.fieldErrors[name]?.[0]
        if (message) setError(name, { message })
      }
    } catch (error) {
      console.error('Failed to send the support message', error)
      setStatus('error')
    }
  })

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className='grid gap-5 rounded-md border bg-black-06 p-5.75 md:grid-cols-2 lg:gap-x-5 lg:gap-y-10 lg:p-9.75 2xl:gap-12.5 2xl:rounded-lg 2xl:p-12.25'
    >
      <ContactTextField
        control={control}
        name='firstName'
        label='First Name'
        placeholder='Enter First Name'
        autoComplete='given-name'
      />
      <ContactTextField
        control={control}
        name='lastName'
        label='Last Name'
        placeholder='Enter Last Name'
        autoComplete='family-name'
      />
      <ContactTextField
        control={control}
        name='email'
        type='email'
        label='Email'
        placeholder='Enter your Email'
        autoComplete='email'
      />
      <PhoneField control={control} />
      <ContactTextField
        control={control}
        name='message'
        label='Message'
        placeholder='Enter your Message'
        multiline
        className='md:col-span-2'
      />

      <div className='flex flex-col md:col-span-2'>
        <div className='flex flex-col gap-5 md:flex-row md:items-center md:gap-17.5'>
          <TermsField control={control} className='md:flex-1' />
          <Button type='submit' disabled={isSubmitting} className='w-full md:w-auto'>
            Send Message
          </Button>
        </div>
        <p
          role='status'
          className={cn(
            'text-14 not-empty:mt-5 2xl:text-18',
            status === 'error' ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {STATUS_TEXT[status]}
        </p>
      </div>
    </form>
  )
}
