import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { CheckboxVariants } from './CheckboxVariants'

export function Checkbox({
  className,
  dimension,
  palette,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & VariantProps<typeof CheckboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(CheckboxVariants({ className, dimension, palette }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current transition-none')}>
        <Check />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
