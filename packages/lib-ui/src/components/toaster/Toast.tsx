import { Cross2Icon } from '@radix-ui/react-icons'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { ToastActionVariants, ToastCloseVariants, ToastVariants } from './Toast.variants'

export const ToastProvider = ToastPrimitives.Provider

export function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) {
  return (
    <ToastPrimitives.Viewport
      data-slot='toast-viewport'
      className={cn(
        'z-100 fixed top-0 flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
        className
      )}
      {...props}
    />
  )
}

export function Toast({
  className,
  palette,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof ToastVariants>) {
  return <ToastPrimitives.Root data-slot='toast' className={cn(ToastVariants({ palette }), className)} {...props} />
}

export function ToastAction({
  className,
  palette,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Action> & VariantProps<typeof ToastActionVariants>) {
  return (
    <ToastPrimitives.Action
      data-slot='toast-action'
      className={cn(ToastActionVariants({ palette }), className)}
      {...props}
      {...props}
    />
  )
}

export function ToastClose({
  className,
  palette,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Close> & VariantProps<typeof ToastCloseVariants>) {
  return (
    <ToastPrimitives.Close
      data-slot='toast-close'
      className={cn(ToastCloseVariants({ palette }), className)}
      toast-close=''
      {...props}
    >
      <Cross2Icon className='size-4' />
    </ToastPrimitives.Close>
  )
}

export function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) {
  return (
    <ToastPrimitives.Title
      data-slot='toast-title'
      className={cn('text-sm font-semibold [&+div]:text-xs', className)}
      {...props}
    />
  )
}

export function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Description>) {
  return (
    <ToastPrimitives.Description
      data-slot='toast-description'
      className={cn('text-sm opacity-90', className)}
      {...props}
    />
  )
}

export type ToastProps = React.ComponentProps<typeof Toast>

export type ToastActionElement = React.ReactElement<typeof ToastAction>
