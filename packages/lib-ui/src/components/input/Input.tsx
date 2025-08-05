import * as React from 'react'

import { VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { InputAdornmentVariants, InputVariants } from './Input.variants'

// type TAdornment = JSX.Element | string | number

export interface AdornmentProps {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof InputVariants> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

/*
 * Note: Ensure the necessary input padding is provided in the ClassName when providing adornments
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ palette, dimension, className, type, startAdornment, endAdornment, ...props }, ref) => {
    const hasAdornment = !!startAdornment || !!endAdornment

    return hasAdornment ? (
      <div
        className={cn(
          /* InputAdornmentVariants({ palette, dimension, className }) */
          'flex h-10 items-center justify-center relative'
        )}
        data-disabled={props.disabled}
      >
        <input
          type={type}
          className={cn(InputVariants({ palette, dimension, className }), className)}
          ref={ref}
          {...props}
        />
        {startAdornment && (
          <div className={cn(InputAdornmentVariants({ palette, dimension, position: 'start' }))}>{startAdornment}</div>
        )}
        {endAdornment && (
          <div className={cn(InputAdornmentVariants({ palette, dimension, position: 'end' }))}>{endAdornment}</div>
        )}
      </div>
    ) : (
      <input type={type} className={cn(InputVariants({ palette, dimension, className }))} ref={ref} {...props} />
    )
  }
)
Input.displayName = 'Input'

export { Input }
