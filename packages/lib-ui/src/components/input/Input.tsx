import * as React from 'react'

import { type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { InputAdornmentVariants, InputVariants } from './InputVariants'

// type TAdornment = JSX.Element | string | number

export interface AdornmentProps {
  endAdornment?: ReactNode
  startAdornment?: ReactNode
}

export type InputProps = React.ComponentProps<'input'> &
  VariantProps<typeof InputVariants> & {
    endAdornment?: ReactNode
    startAdornment?: ReactNode
  }

/*
 * Note: Ensure the necessary input padding is provided in the ClassName when providing adornments
 */
export function Input({ className, dimension, endAdornment, palette, startAdornment, type, ...props }: InputProps) {
  const hasAdornment = !!startAdornment || !!endAdornment

  return hasAdornment ? (
    <div
      className={cn('relative flex h-10 items-center justify-center', { 'pointer-events-none': props.disabled })}
      data-disabled={props.disabled}
    >
      <input
        type={type}
        className={cn(InputVariants({ className, dimension, palette }))}
        data-slot='input'
        {...props}
      />
      {startAdornment && (
        <div
          data-slot='input-adornment-start'
          data-disabled={props.disabled}
          className={cn(InputAdornmentVariants({ dimension, palette, position: 'start' }))}
        >
          {startAdornment}
        </div>
      )}
      {endAdornment && (
        <div
          data-slot='input-adornment-end'
          data-disabled={props.disabled}
          className={cn(InputAdornmentVariants({ dimension, palette, position: 'end' }))}
        >
          {endAdornment}
        </div>
      )}
    </div>
  ) : (
    <input type={type} data-slot='input' className={cn(InputVariants({ className, dimension, palette }))} {...props} />
  )
}
