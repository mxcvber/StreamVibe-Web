import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqItem } from '@/data/faq'

/**
 * The red gradient the design draws its FAQ dividers with. It only paints
 * where a border width exists, so it is safe on every row and on the list.
 */
export const FAQ_DIVIDER = '[border-image:linear-gradient(90deg,transparent,var(--color-red-45)_16.67%,transparent)_1]'

type FaqAccordionProps = {
  items: FaqItem[]
  /** Id of the item that starts open. */
  defaultValue?: string
  className?: string
}

/**
 * Row geometry from Figma, mobile → laptop → desktop: padding / badge / padding
 * of 24 / 46 / 24, 24 / 54 / 24 and 30 / 67 / 30. The mobile artboard also
 * gives the divider a 20px gutter on each side, which is folded into the row
 * padding here (44px). The answer's left padding lines it up under the
 * question: trigger padding + badge width + gap at each artboard.
 */
export function FaqAccordion({ items, defaultValue, className }: FaqAccordionProps) {
  return (
    <Accordion type='single' collapsible defaultValue={defaultValue} className={className}>
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id} className={FAQ_DIVIDER}>
          <AccordionTrigger className='cursor-pointer px-2.5 py-11 lg:px-6 lg:py-6 2xl:px-8.5 2xl:py-7.5'>
            <span className='flex h-11.5 min-w-10.5 shrink-0 items-center justify-center rounded-md border bg-muted px-3 text-16 font-semibold text-foreground lg:h-13.5 lg:min-w-12.5 lg:px-4 2xl:h-16.75 2xl:min-w-16 2xl:px-4.75 2xl:text-20'>
              {item.number}
            </span>
            <span className='flex-1 text-18 font-medium text-foreground lg:text-20 2xl:text-22'>{item.question}</span>
          </AccordionTrigger>
          <AccordionContent className='pt-3 pr-2.5 pb-5 pl-2.5 lg:pt-3.5 lg:pr-16 lg:pb-6 lg:pl-22.5 2xl:pt-5 2xl:pr-22 2xl:pb-8.5 2xl:pl-30.5'>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
