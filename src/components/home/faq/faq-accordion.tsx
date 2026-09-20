import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqItem } from '@/data/faq'

type FaqAccordionProps = {
  items: FaqItem[]
  /** Id of the item that starts open. */
  defaultValue?: string
}

/**
 * Geometry from Figma: a closed row is 30px padding / 67px badge / 30px. An
 * open item is 34px padding, the badge, question and icon top-aligned, and the
 * answer starting 20px under the question — for a one-line question that is
 * inside the badge's height. Radix renders the answer *after* the trigger row,
 * so when open the badge gets a negative bottom margin that shrinks its flex
 * contribution to one text line (67 − 34 = 33). The row's height then follows
 * the question, however many lines it wraps to, the badge simply paints past
 * it, and the answer keeps a real 20px top padding.
 */
export function FaqAccordion({ items, defaultValue }: FaqAccordionProps) {
  return (
    <Accordion type='single' collapsible defaultValue={defaultValue}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className='not-last:[border-image:linear-gradient(90deg,transparent,var(--color-red-45)_16.67%,transparent)_1]'
        >
          <AccordionTrigger className='cursor-pointer px-8.5 py-7.5'>
            <span className='flex h-16.75 min-w-16 shrink-0 items-center justify-center rounded-md border bg-muted px-4.75 text-20 font-semibold text-foreground'>
              {item.number}
            </span>
            <span className='flex-1 text-22 font-medium text-foreground'>{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className='pt-5 pr-22 pb-8.5 pl-30.5'>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
