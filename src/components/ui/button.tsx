import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-md hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-[0.98] rounded-full border border-primary/10",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:shadow-md hover:shadow-destructive/20 hover:-translate-y-0.5 active:scale-[0.98] rounded-full border border-destructive/10",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 hover:shadow-md hover:shadow-primary/10 active:scale-[0.98] rounded-full",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground hover:shadow-md hover:shadow-secondary/20 hover:-translate-y-0.5 active:scale-[0.98] rounded-full border border-secondary/10",
        accent:
          "bg-accent text-accent-foreground hover:shadow-md hover:shadow-accent/20 hover:-translate-y-0.5 active:scale-[0.98] rounded-full border border-accent/10",
        ghost: "hover:bg-muted rounded-full",
        link: "text-primary underline-offset-4 hover:underline rounded-full",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 py-1.5",
        lg: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
