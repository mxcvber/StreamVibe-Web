"use server"

import { type SupportMessageResult, supportMessageSchema } from "@/features/contact-form/schemas"
import { z } from "zod"

export async function sendSupportMessage(values: unknown): Promise<SupportMessageResult> {
  const result = supportMessageSchema.safeParse(values)

  if (!result.success) {
    return { ok: false, fieldErrors: z.flattenError(result.error).fieldErrors }
  }

  return { ok: true }
}
