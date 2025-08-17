import { Slot } from '@radix-ui/react-slot'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { ButtonVariants } from './ButtonVariants'

export function Button({
  active = false,
  asChild = false,
  className,
  dimension,
  mode,
  palette,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof ButtonVariants> & {
    active?: boolean
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      data-slot='button'
      data-active={active}
      className={cn(ButtonVariants({ className, dimension, mode, palette }), { active: true })}
      {...props}
    />
  )
}
