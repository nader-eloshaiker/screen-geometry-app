import RefreshIcon from '@/app/assets/icons/Refresh'
import { FormButton } from '@/app/components/formbutton/FormButton'
import { useCreateScreenEffect } from '@/app/hooks/api/useCreateScreenEffect'
import { useUpdateScreenEffect } from '@/app/hooks/api/useUpdateScreenEffect'
import { DarkMode, LightMode } from '@/app/stores/theme/Theme.types'
import { createScreenColors } from '@/app/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ScreenInput, type SearchItem, useCreateScreen, useUpdateScreen } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Form } from '@screengeometry/lib-ui/form'
import { Separator } from '@screengeometry/lib-ui/separator'
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { ColorField } from './fields/ColorField'
import { InputField } from './fields/InputField'
import { FormModeTypes } from './FormMode'
import { FormSubmitType, ScreenFormSchema } from './ScreenFormSchema'

type Props = React.PropsWithChildren & {
  setOpen: Dispatch<SetStateAction<boolean>>
  isFormLoading: boolean
  editId?: string
  editScreen?: FormSubmitType
  selectedItem: SearchItem | undefined
  setSelectedItem: Dispatch<SetStateAction<SearchItem | undefined>>
}

export const ScreenForm = ({ setOpen, editId, isFormLoading, editScreen, selectedItem, setSelectedItem }: Props) => {
  const { isPending: isCreateLoading, mutate: createAction, data: createData, error: createError } = useCreateScreen()
  useCreateScreenEffect(createData, createError)

  const { isPending: isUpdateLoading, mutate: updateAction, data: updateData, error: updateError } = useUpdateScreen()
  useUpdateScreenEffect(updateData, updateError)

  const isLoading = isCreateLoading || isUpdateLoading || isFormLoading

  const { formatMessage } = useIntl()

  const form = useForm<FormSubmitType>({
    resolver: zodResolver(ScreenFormSchema),
    mode: 'onSubmit',
  })
  const {
    formState: { isDirty },
    setValue,
    handleSubmit,
    reset,
    resetField,
    control,
  } = form
  const [toggleAnimation, setToggleAnimation] = useState<boolean>(false)

  const handleClose = () => {
    setOpen(false)
    setSelectedItem(undefined)
  }

  useEffect(() => {
    // Gaurd Order is important
    if (!selectedItem) {
      reset()
      return
    }

    setValue('aspectRatio', selectedItem.aspectRatio, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    if (selectedItem.diagonalSize) {
      setValue('diagonalSize', selectedItem.diagonalSize, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField('diagonalSize')
    }
    if (selectedItem.hRes) {
      setValue('hRes', selectedItem.hRes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField('hRes')
    }
    if (selectedItem.vRes) {
      setValue('vRes', selectedItem.vRes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField('vRes')
    }
    // only effect on selection change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const generateColorHandler = () => {
    const color = createScreenColors()

    setValue('darkColor', color.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('lightColor', color.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleReset = () => {
    setSelectedItem(undefined)
    reset()
  }

  const actionSubmit: SubmitHandler<FormSubmitType> = (form: FormSubmitType) => {
    ReactGA.event({
      category: 'Submit Button Click',
      action: `Submited ${editId ? FormModeTypes.edit : FormModeTypes.create} Screen Button`,
      label: 'Screens Page',
    })

    // type casting safe due to form validation
    if (editId) {
      updateAction({ id: editId, data: form as ScreenInput }, { onSuccess: handleClose })
    } else {
      createAction({ data: form as ScreenInput }, { onSuccess: handleClose })
    }

    setSelectedItem(undefined)
    reset()
  }

  useEffect(() => {
    if (editScreen) {
      reset(editScreen)
    } else {
      const color = createScreenColors()
      const value = { ...color }

      reset(value)
    }
  }, [editScreen, reset])

  return (
    <Form {...form}>
      <form method='post' onSubmit={handleSubmit(actionSubmit)}>
        <div className='flex flex-col gap-10'>
          <div id='screenTag' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={'diagonalSize'}
              control={control}
              title={formatMessage({ id: 'screen.form.size', defaultMessage: 'Screen Size' })}
              type='number'
              dir='auto'
              endAdornment='in'
              autoComplete='off'
              placeholder='27'
              isLoading={isFormLoading}
              className='shadow-lg'
            />

            <InputField
              formKey={'aspectRatio'}
              control={control}
              title={formatMessage({ id: 'screen.form.aspect', defaultMessage: 'Aspect Ratio' })}
              type='text'
              dir='auto'
              autoComplete='off'
              placeholder='16:9'
              isLoading={isFormLoading}
              className='shadow-lg'
            />
          </div>

          <div id='screenData' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={'hRes'}
              control={control}
              title={formatMessage({ id: 'screen.form.horizontal', defaultMessage: 'Horizontal Res' })}
              type='number'
              dir='auto'
              endAdornment='px'
              autoComplete='off'
              placeholder='3840'
              isLoading={isFormLoading}
              className='shadow-lg'
            />

            <InputField
              formKey={'vRes'}
              control={control}
              title={formatMessage({ id: 'screen.form.vertical', defaultMessage: 'Vertical Res' })}
              type='number'
              dir='auto'
              endAdornment='px'
              autoComplete='off'
              placeholder='2160'
              isLoading={isFormLoading}
              className='shadow-lg'
            />
          </div>

          <div className='flex items-end justify-between gap-6'>
            <ColorField
              formKey={'lightColor'}
              title={formatMessage({ id: 'screen.form.light', defaultMessage: 'Light Color' })}
              mode={LightMode}
              isLoading={isFormLoading}
              control={control}
              className='w-full'
            />
            <ColorField
              formKey={'darkColor'}
              title={formatMessage({ id: 'screen.form.dark', defaultMessage: 'Dark Color' })}
              mode={DarkMode}
              isLoading={isFormLoading}
              control={control}
              className='w-full'
            />
            <Button
              type='button'
              className='size-9'
              title={formatMessage({ id: 'screen.form.colors', defaultMessage: 'Generate Colors' })}
              dimension='icon-lg'
              data-testid='generate-color-btn'
              mode='ghost'
              onMouseDown={() => setToggleAnimation(!toggleAnimation)}
              onClick={generateColorHandler}
              disabled={isFormLoading}
            >
              <RefreshIcon
                className='size-6 fill-current transition-transform duration-500'
                toggleAnimation={toggleAnimation}
              />
            </Button>
          </div>

          <Separator decorative={true} />

          <div className='flex w-full justify-between'>
            <div className='flex gap-6'>
              <FormButton type='button' className='shadow-lg' mode='outline' onClick={handleClose} loading={isLoading}>
                <FormattedMessage id='screens.form.close' defaultMessage='Close' />
              </FormButton>
              <FormButton
                type='button'
                className='shadow-lg'
                mode='outline'
                onClick={handleReset}
                loading={isLoading}
                disabled={!isDirty}
              >
                <FormattedMessage id='screens.form.reset' defaultMessage='Reset' />
              </FormButton>
            </div>
            <FormButton
              type='submit'
              className='w-26 shadow-lg'
              loading={isLoading}
              disabled={!isDirty}
              showSpinner={true}
            >
              {!editId ? (
                <FormattedMessage id='screens.form.createButton' defaultMessage='Create' />
              ) : (
                <FormattedMessage id='screens.form.updateButton' defaultMessage='Update' />
              )}
            </FormButton>
          </div>
        </div>
      </form>
    </Form>
  )
}
