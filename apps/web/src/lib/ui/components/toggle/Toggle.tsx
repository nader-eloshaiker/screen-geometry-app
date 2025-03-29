import * as TogglePrimitive from '@radix-ui/react-toggle'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { ToggleVariants } from './Toggle.variants'

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof ToggleVariants>
>(({ className, mode, dimension: size, ...props }, ref) => (
  <TogglePrimitive.Root ref={ref} className={cn(ToggleVariants({ mode, dimension: size, className }))} {...props} />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, ToggleVariants }
