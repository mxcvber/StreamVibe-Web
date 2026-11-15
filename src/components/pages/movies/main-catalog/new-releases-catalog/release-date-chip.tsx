interface ReleaseDateChipProps {
  date: string
  label: string
}

export function ReleaseDateChip({ date, label }: ReleaseDateChipProps) {
  return (
    <p className='rounded-full border border-black-15 bg-black-08 px-3.25 py-1.25 text-center text-12 font-medium whitespace-nowrap text-grey-60 2xl:text-16'>
      <span className='@max-[9rem]:sr-only 2xl:@max-[13.75rem]:sr-only'>Released at </span>
     
      <time dateTime={date} className='text-grey-75'>
        {label}
      </time>
    </p>
  )
}
