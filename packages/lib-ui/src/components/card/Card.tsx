import * as React from 'react'

import { cn } from '../../lib/utils'

export function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'border-card-border bg-card text-card-foreground hocus:border-card-border-hover flex flex-col gap-6 rounded-xl border-2 py-6 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '[.border-b]:pb-6" @container/card-header has-data-[slot=card-action]:grid-cols-[1fr_auto] grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6',
        className
      )}
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-title' className={cn('font-semibold leading-none', className)} {...props} />
}

export function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-description' className={cn('text-foreground-muted text-sm', className)} {...props} />
}

export function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-content' className={cn('px-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot='card-footer' className={cn('[.border-t]:pt-6 flex items-center px-6', className)} {...props} />
}
