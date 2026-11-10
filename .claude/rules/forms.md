---
paths:
  - src/features/contact-form/**
  - src/**/*-form.tsx
  - src/**/*-field.tsx
---

# Forms

- Forms use React Hook Form with `zodResolver` and **Zod 4** (`zod` is pinned to v4 in
  `package.json`; shadcn and eslint keep their own nested Zod 3). Fields follow shadcn's
  pattern: a `Controller` rendering `Field` + `FieldLabel` + the control + `FieldError`, with
  `data-invalid` on the `Field` and `aria-invalid` on the control.
- The contact form is one folder, `src/features/contact-form/` (`.claude/docs/architecture.md`).
  `ContactForm` owns `useForm`, the submit handler and the toasts, and renders `FormContent`,
  which only lays out the fields. Each field takes `control`, typed `ContactFormControl`.
- The schema lives in the feature's `schemas.ts`, a plain module (neither `'use client'` nor
  `server-only`), so the form and its Server Action share it. The action re-parses its
  argument with the same schema, because anyone can POST to an action. On failure it returns
  `z.flattenError(error).fieldErrors`, and the form puts them back with `setError`.
  Reference: `supportMessageSchema` and `sendSupportMessage`.
- A check that reads two fields is an object-level `.refine` with `path` set to the field that
  shows the message, plus a `when` so it runs even while other fields are invalid. The field
  it depends on declares `rules={{ deps: '<field>' }}` so changing it re-checks the first
  (the phone number against its country in `PhoneField`).
- A required checkbox is `z.boolean().refine(…)`, not `z.literal(true)`, so its input type
  stays `boolean` and it can start in either state (`agreeToTerms` starts checked).
- The Figma sizes live in the primitives (`Input`, `Textarea`, `Select`, `Checkbox`, `Label`,
  `Field`), as with `Button`. Feature components only lay fields out.
- Undesigned states stay quiet on the fields: a red border plus a 14/16px message under the
  control, also for the errors the action returns. The send outcome is a Sonner toast
  (`toast.success`, or `toast.error` when the action throws). The `Toaster` always renders a
  polite live region, so screen readers announce it.
- `sendSupportMessage` validates and then sends nothing: the API has no support endpoint yet.
  Once it does, send `result.data` through `api` there.
