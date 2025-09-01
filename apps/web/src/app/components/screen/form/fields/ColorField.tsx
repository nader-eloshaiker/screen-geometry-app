import { DarkMode, LightMode, type TThemeMode } from '@/app/hooks/theme/Theme.types'
import { cn } from '@/lib/utils'
import type { ScreenDataType } from '@screengeometry/lib-api/extended'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@screengeometry/lib-ui/form'
import { Input } from '@screengeometry/lib-ui/input'
import { type Control, useFormContext } from 'react-hook-form'
import { type FormSubmitType } from '../ScreenFormSchema'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  control: Control<FormSubmitType> | undefined
  formKey: ScreenDataType
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
          <FormLabel palette='mono'>{title}</FormLabel>
          <FormControl>
            <Input
              {...field}
              palette={errors[formKey] ? 'danger' : 'primary'}
              className={cn('shadow-lg', {
                'hocus:text-black text-black': mode === LightMode,
                'hocus:text-white text-white': mode === DarkMode,
                'pointer-events-none animate-pulse': isLoading,
              })}
              style={{ backgroundColor: color }}
              type='text'
              readOnly
              value='' // Map null to an empty string
              // onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
