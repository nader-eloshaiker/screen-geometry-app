import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/class-name'
import { ButtonVariants } from './ButtonVariants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent: variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(ButtonVariants({ intent: variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = 'Button'

export { Button, ButtonVariants }
