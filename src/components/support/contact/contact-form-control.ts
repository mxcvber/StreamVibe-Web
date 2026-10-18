import type { Control } from 'react-hook-form'

import type { SupportMessage, SupportMessageInput } from '@/lib/support-message'

/** The contact form's `control`, as its field components receive it. */
export type ContactFormControl = Control<SupportMessageInput, unknown, SupportMessage>
