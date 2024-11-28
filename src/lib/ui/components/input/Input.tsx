import * as React from 'react'

import { cn } from '@/lib/utils/class-name'
import { VariantProps } from 'class-variance-authority'
import { InputVariants } from './inputVariants'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ palette, dimension, className, type, ...props }, ref) => {
    return <input type={type} className={cn(InputVariants({ palette, dimension, className }))} ref={ref} {...props} />
  },
)
Input.displayName = 'Input'

export { Input }
