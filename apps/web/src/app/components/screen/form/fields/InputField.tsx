import { cn } from '@/lib/utils'
import { ScreenDataEnum } from '@screengeometry/lib-api/internal'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@screengeometry/lib-ui/form'
import { AdornmentProps, Input } from '@screengeometry/lib-ui/input'
import { Control, useFormContext } from 'react-hook-form'
import { FormSubmitType } from '../ScreenFormSchema'

type Props = React.InputHTMLAttributes<HTMLInputElement> &
  AdornmentProps & {
    formKey: ScreenDataEnum
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
                'animate-pulse pointer-events-none': isLoading,
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
