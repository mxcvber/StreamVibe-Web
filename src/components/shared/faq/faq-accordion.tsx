import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shared/ui/accordion'
import { FaqItem } from '@/types/faq'

type FaqAccordionProps = {
  items: FaqItem[]
  defaultValue?: string
  className?: string
}

export function FaqAccordion({ items, defaultValue, className }: FaqAccordionProps) {
  return (
    <Accordion type='single' collapsible defaultValue={defaultValue} className={className}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className='faq-divider px-2.5 py-11 lg:px-6 lg:py-6 2xl:px-8.5 2xl:py-7.5'
        >
          <AccordionTrigger className='cursor-pointer'>
            <span className='flex h-11.5 min-w-10.5 shrink-0 items-center justify-center rounded-md border bg-muted px-3 text-16 font-semibold text-foreground lg:h-13.5 lg:min-w-12.5 lg:px-4 2xl:h-16.75 2xl:min-w-16 2xl:px-4.75 2xl:text-20'>
              {item.number}
            </span>

            <div className='flex-1'>
              <span className='text-18 font-medium text-foreground lg:text-20 2xl:text-22'>{item.question}</span>

              <AccordionContent className='hidden lg:block'>{item.answer}</AccordionContent>
            </div>
          </AccordionTrigger>

          <AccordionContent className='block lg:hidden pt-3 pb-0'>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
