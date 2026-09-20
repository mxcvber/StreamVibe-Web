import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Slot } from "radix-ui"

// Sizes follow the Figma buttons: 24/18px padding for CTAs (63px tall),
// 24/14px for the nav pill (55px), and square icon buttons padded 14px around
// a 28px icon or 16px around a 24px icon. Button text is always 18px.
//
// Every padding below is the Figma value minus 1px: Figma draws strokes inside
// the frame, while the CSS border adds to the box, so 23/17px + 1px border
// reproduces Figma's 24/18px and the same outer size. Don't round them back.
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent text-18 font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
        default: "gap-1 px-5.75 py-4.25",
        sm: "px-5.75 py-3.25 font-medium",
        icon: "p-3.25 [&_svg]:size-7",
        "icon-sm": "p-3.75 [&_svg]:size-6",
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
