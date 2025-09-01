import { cn } from '@/lib/utils'
import type { ScreenDataType } from '@screengeometry/lib-api/extended'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@screengeometry/lib-ui/form'
import { type AdornmentProps, Input } from '@screengeometry/lib-ui/input'
import { type Control, useFormContext } from 'react-hook-form'
import { type FormSubmitType } from '../ScreenFormSchema'

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  AdornmentProps & {
    formKey: ScreenDataType
    title: string
    overlay?: string
    isLoading?: boolean
    control: Control<FormSubmitType> | undefined
    className?: string
  }

export const InputField = ({
  className,
  control,
  formKey,
  title,
  endAdornment,
  startAdornment,
  isLoading = false,
  ...rest
}: Props) => {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <FormField<FormSubmitType>
      control={control}
      name={formKey}
      render={({ field }) => (
        <FormItem>
          <FormLabel palette='mono'>{title}</FormLabel>
          <FormControl>
            <Input
              {...field}
              palette={errors[formKey] ? 'danger' : 'primary'}
              endAdornment={endAdornment}
              startAdornment={startAdornment}
              className={cn(className, {
                'pointer-events-none animate-pulse': isLoading,
              })}
              value={field.value ?? ''} // Map null to an empty string
              //onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
