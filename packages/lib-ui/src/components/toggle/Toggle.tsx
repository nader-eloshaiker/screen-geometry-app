import * as TogglePrimitive from '@radix-ui/react-toggle'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { ToggleVariants } from './Toggle.variants'

export function Toggle({
  className,
  dimension: size,
  mode,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof ToggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot='toggle'
      className={cn(ToggleVariants({ className, dimension: size, mode }))}
      {...props}
    />
  )
}
