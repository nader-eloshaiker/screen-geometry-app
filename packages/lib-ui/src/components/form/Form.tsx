import * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { Controller, type ControllerProps, type FieldPath, type FieldValues, FormProvider } from 'react-hook-form'

import type { VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Label, LabelVariants } from '../label'
import { FormFieldContext, FormItemContext } from './FormContext'
import { useFormField } from './useFormField'

export const Form = FormProvider

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

export function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()
  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot='form-item' className={cn('grid gap-2', className)} {...props} />
    </FormItemContext.Provider>
  )
}

export function FormLabel({
  className,
  palette,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof LabelVariants>) {
  const { error, formItemId } = useFormField()
  return (
    <Label
      data-slot='form-label'
      data-error={!!error}
      palette={error ? 'danger' : palette}
      className={cn(className, 'pointer-events-none')}
      htmlFor={formItemId}
      {...props}
    />
  )
}

export function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formDescriptionId, formItemId, formMessageId } = useFormField()
  return (
    <Slot
      data-slot='form-control'
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  )
}

export function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField()
  return (
    <p
      data-slot='form-description'
      id={formDescriptionId}
      className={cn('text-foreground-muted text-sm', className)}
      {...props}
    />
  )
}
export function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? '') : props.children
  if (!body) {
    return null
  }
  return (
    <p data-slot='form-message' id={formMessageId} className={cn('text-danger-label text-sm', className)} {...props}>
      {body}
    </p>
  )
}
