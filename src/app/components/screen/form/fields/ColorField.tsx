import { DarkMode, LightMode, TThemeMode } from '@/app/contexts/theme/Theme.types'
import { ScreenDataEnum } from '@/lib/openapi/models/Screen'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/ui/components/form/Form'
import { Input } from '@/lib/ui/components/input/Input'
import { cn } from '@/lib/utils'
import { Control, useFormContext } from 'react-hook-form'
import { FormSubmitType } from '../ScreenFormSchema'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  control: Control<FormSubmitType> | undefined
  formKey: ScreenDataEnum
  title: string
  mode: TThemeMode
  isLoading?: boolean
}

export const ColorField = ({ className, control, formKey, title, mode, isLoading = false }: Props) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext()
  const color = watch(formKey)
  return (
    <FormField<FormSubmitType>
      control={control}
      name={formKey}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel palette='primary'>{`${title} Color`}</FormLabel>
          <FormControl>
            <Input
              {...field}
              palette={errors[formKey] ? 'danger' : 'primary'}
              className={cn('shadow-lg', {
                'text-black hocus:text-black': mode === LightMode,
                'text-white hocus:text-white': mode === DarkMode,
                'animate-pulse pointer-events-none': isLoading,
              })}
              style={{ backgroundColor: color }}
              type='text'
              value={field.value ?? ''} // Map null to an empty string
              // onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
