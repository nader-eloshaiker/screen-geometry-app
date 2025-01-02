import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { type VariantProps } from 'class-variance-authority'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { ToggleVariants } from '../toggle/Toggle.variants'

const ToggleGroupContext = React.createContext<VariantProps<typeof ToggleVariants>>({
  palette: 'primary',
  mode: 'ghost',
  dimension: 'md',
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof ToggleVariants>
>(({ className, mode, dimension, palette, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      'flex items-center justify-center',
      { 'gap-2': mode !== 'pill', 'gap-0': mode === 'pill' },
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ mode, dimension, palette }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof ToggleVariants>
>(({ className, children, mode, dimension: size, palette, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        ToggleVariants({
          palette: context.palette || palette,
          mode: context.mode || mode,
          dimension: context.dimension || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
