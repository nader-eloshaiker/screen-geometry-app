import { cn } from '@/lib/utils/class-name'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { ComponentProps, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { CheckboxVariants } from './CheckboxVariants'

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof CheckboxVariants>

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & VariantProps<typeof CheckboxVariants>
>(({ className, dimension, palette, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn(CheckboxVariants({ palette, dimension, className }))} {...props}>
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
