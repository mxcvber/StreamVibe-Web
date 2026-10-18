---
paths:
  - src/components/**/*-form.tsx
  - src/components/**/*-field.tsx
  - src/app/**/actions.ts
  - src/lib/*-message.ts
---

# Forms

- Forms use React Hook Form with `zodResolver` and **Zod 4** (`zod` is pinned to v4 in
  `package.json`; shadcn and eslint keep their own nested Zod 3). Fields follow shadcn's
  pattern: a `Controller` rendering `Field` + `FieldLabel` + the control + `FieldError`, with
  `data-invalid` on the `Field` and `aria-invalid` on the control.
- The schema lives in a plain `src/lib` module (neither `'use client'` nor `server-only`) so
  the form and its Server Action share it. The action re-parses its argument with the same
  schema, because anyone can POST to an action. On failure it returns
  `z.flattenError(error).fieldErrors`, and the form puts them back with `setError`.
  Reference: `src/lib/support-message.ts`, `src/app/support/actions.ts`.
- A check that reads two fields is an object-level `.refine` with `path` set to the field that
  shows the message, plus a `when` so it runs even while other fields are invalid. The field
  it depends on declares `rules={{ deps: '<field>' }}` so changing it re-checks the first
  (the phone number against its country in `phone-field.tsx`).
- The Figma sizes live in the primitives (`input`, `textarea`, `select`, `checkbox`,
  `label`, `field` in `src/components/ui/`), as with `button.tsx`. Feature components only
  lay fields out.
- Undesigned states (errors, success) stay quiet: a red border plus a 14/16px message under
  the control, and a single status line in a `role='status'` region that is always rendered.
