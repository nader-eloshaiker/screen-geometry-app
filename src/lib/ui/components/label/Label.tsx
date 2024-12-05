import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/class-name'
import { LabelVariants } from './LabelVariants'

export interface LabelProps extends React.InputHTMLAttributes<HTMLLabelElement>, VariantProps<typeof LabelVariants> {}

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof LabelVariants>
>(({ className, palette, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(LabelVariants({ palette, className }))} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
