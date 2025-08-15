import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import * as React from 'react'

import { cn } from '../../lib/utils'
import { ToggleVariants } from '../toggle/Toggle.variants'

const ToggleGroupContext = React.createContext<VariantProps<typeof ToggleVariants>>({
  dimension: 'md',
  mode: 'ghost',
  palette: 'primary',
})

export function ToggleGroup({
  children,
  className,
  dimension,
  mode,
  palette,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof ToggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      className={cn(
        'group/toggle-group flex w-fit items-center justify-center',
        { 'gap-0': mode === 'pill', 'gap-2': mode !== 'pill', 'shadow-xs': mode === 'pill' || mode === 'outline' },
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ dimension, mode, palette }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}

export function ToggleGroupItem({
  children,
  className,
  dimension: size,
  mode,
  palette,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof ToggleVariants>) {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot='toggle-group-item'
      className={cn(
        ToggleVariants({
          dimension: context.dimension || size,
          mode: context.mode || mode,
          palette: context.palette || palette,
        }),
        'focus-visible:z-10',
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}
