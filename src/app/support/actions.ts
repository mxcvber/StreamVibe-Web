'use server'

import { z } from 'zod'

import { type SupportMessageResult, supportMessageSchema } from '@/lib/support-message'

/**
 * Receives the support page's contact form. The form has already validated
 * in the browser, but anyone can POST to an action, so the payload is parsed
 * again with the same schema and field errors are returned for the form to
 * show.
 *
 * The NestJS API has no support endpoint yet, so a valid message currently
 * goes nowhere. Once it does, send `result.data` through the shared client
 * in `src/lib/api` here.
 */
export async function sendSupportMessage(values: unknown): Promise<SupportMessageResult> {
  const result = supportMessageSchema.safeParse(values)
  if (!result.success) {
    return { ok: false, fieldErrors: z.flattenError(result.error).fieldErrors }
  }

  return { ok: true }
}
