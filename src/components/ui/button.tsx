import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Sizes follow the Figma buttons at each artboard. Mobile and laptop share one
// scale and desktop (`2xl:`) has its own:
//   CTA       20/14px padding, 14px text (49px tall)  →  24/18px, 18px (63px)
//   nav pill  20/12px, 14px (45px)                    →  24/14px, 18px (55px)
//   icon      10px around a 24px icon (44px)          →  14px around 28px (56px)
//   icon-sm   12px around a 20px icon (44px)          →  16px around 24px (56px)
//
// Every padding below is the Figma value minus 1px: Figma draws strokes inside
// the frame, while the CSS border adds to the box, so 19/13px + 1px border
// reproduces Figma's 20/14px and the same outer size. Don't round them back.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent text-14 font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 2xl:text-18 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-red-50",
        secondary:
          "border-black-12 bg-secondary text-secondary-foreground hover:bg-accent",
        outline: "border-border bg-background text-foreground hover:bg-secondary",
        ghost: "text-grey-75 hover:text-foreground",
      },
      size: {
        default: "gap-1 px-4.75 py-3.25 2xl:px-5.75 2xl:py-4.25",
        sm: "px-4.75 py-2.75 font-medium 2xl:px-5.75 2xl:py-3.25",
        icon: "p-2.25 [&_svg]:size-6 2xl:p-3.25 2xl:[&_svg]:size-7",
        "icon-sm": "p-2.75 [&_svg]:size-5 2xl:p-3.75 2xl:[&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
