'use client'

import * as React from 'react'

import { cn } from '../../lib/utils'

export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot='table-container' className='relative w-full overflow-x-auto'>
      <table data-slot='table' className={cn('w-full caption-bottom text-sm', className)} {...props} />
    </div>
  )
}
export function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot='table-header'
      className={cn('[&_tr]:border-primary-border [&_tr]:border-b', className)}
      {...props}
    />
  )
}
export function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return <tbody data-slot='table-body' className={cn('[&_tr:last-child]:border-0', className)} {...props} />
}
export function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot='table-footer'
      className={cn('border-mono-border bg-muted/25 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  )
}
export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot='table-row'
      className={cn(
        'border-muted data-[state=selected]:bg-muted [[data-slot=table-body]_&:hover]:bg-muted border-b transition-colors',
        className
      )}
      {...props}
    />
  )
}
export function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot='table-head'
      className={cn(
        'text-foreground-muted h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}
export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot='table-cell'
      className={cn(
        'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}
export function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption data-slot='table-caption' className={cn('text-foreground-muted mt-4 text-sm', className)} {...props} />
  )
}
