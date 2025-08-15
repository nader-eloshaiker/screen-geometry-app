import * as LabelPrimitive from '@radix-ui/react-label'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { LabelVariants } from './LabelVariants'

export function Label({
  className,
  palette,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof LabelVariants>) {
  return <LabelPrimitive.Root data-slot='label' className={cn(LabelVariants({ className, palette }))} {...props} />
}
