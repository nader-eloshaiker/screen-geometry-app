import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { AlertVariants } from './AlertVariants'

export function Alert({
  className,
  palette,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof AlertVariants>) {
  return <div data-slot='alert' role='alert' className={cn(AlertVariants({ palette }), className)} {...props} />
}

export function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-title'
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  )
}

export function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='alert-description'
      className={cn('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  )
}
