import { useContext } from 'react'
import { useFormContext, useFormState } from 'react-hook-form'
import { FormFieldContext, FormItemContext } from './FormContext'

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }
  const { id } = itemContext
  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  }
}
