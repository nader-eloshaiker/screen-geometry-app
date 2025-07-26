import RefreshIcon from '@/app/assets/icons/Refresh'
import { useCreateScreenApi } from '@/app/hooks/api/helpers/useCreateScreenApi'
import { useUpdateScreenApi } from '@/app/hooks/api/helpers/useUpdateScreenApi'
import { DarkMode, LightMode } from '@/app/hooks/theme/Theme.types'
import { cn, createCSSColor } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { ScreenDataEnum } from '@screengeometry/lib-api/internal'
import { ScreenInput, SearchItem } from '@screengeometry/lib-api/spec'
import { Button } from '@screengeometry/lib-ui/button'
import { Form } from '@screengeometry/lib-ui/form'
import { Separator } from '@screengeometry/lib-ui/separator'
import { Loader2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { EmptyInputValues, FormSubmitType, ScreenFormSchema } from './ScreenFormSchema'
import { ColorField } from './fields/ColorField'
import { InputField } from './fields/InputField'

type Props = TReactChildren & {
  setOpen: Dispatch<SetStateAction<boolean>>
  isEditLoading?: boolean
  editId?: string
  editScreen?: FormSubmitType
  selectedItem: SearchItem | undefined
  setSelectedItem: Dispatch<SetStateAction<SearchItem | undefined>>
}

export const ScreenForm = ({ setOpen, editId, isEditLoading, editScreen, selectedItem, setSelectedItem }: Props) => {
  const { isPending: isCreateLoading, mutate: createAction } = useCreateScreenApi()
  const { isPending: isUpdateLoading, mutate: updateAction } = useUpdateScreenApi()
  const { formatMessage } = useIntl()

  const form = useForm<FormSubmitType>({
    resolver: yupResolver(ScreenFormSchema),
    defaultValues: EmptyInputValues,
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

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    // Gaurd Order is important
    if (!selectedItem) {
      reset()
      return
    }

    setValue(ScreenDataEnum.aspectRatio, selectedItem.aspectRatio, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    if (selectedItem.diagonalSize) {
      setValue(ScreenDataEnum.diagonalSize, selectedItem.diagonalSize, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField(ScreenDataEnum.diagonalSize)
    }
    if (selectedItem.hRes) {
      setValue(ScreenDataEnum.hRes, selectedItem.hRes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField(ScreenDataEnum.hRes)
    }
    if (selectedItem.vRes) {
      setValue(ScreenDataEnum.vRes, selectedItem.vRes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField(ScreenDataEnum.vRes)
    }
    // only effect on selection change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const generateColorHandler = () => {
    const color = createCSSColor()

    setValue(ScreenDataEnum.darkColor, color.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(ScreenDataEnum.lightColor, color.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const resetHandler = () => {
    setSelectedItem(undefined)
    reset()
  }

  const submitHandler: SubmitHandler<FormSubmitType> = (form: FormSubmitType) => {
    ReactGA.event({
      category: 'Submit Button Click',
      action: `Submited ${editId ? 'Update' : 'Create'} Screen Button`,
      label: 'Screens Page',
    })

    // type casting safe due to form validation
    if (editId) {
      updateAction({ id: editId, data: form as ScreenInput }, { onSuccess: onClose })
    } else {
      createAction({ data: form as ScreenInput }, { onSuccess: onClose })
    }

    setSelectedItem(undefined)
    reset(EmptyInputValues)
  }

  useEffect(() => {
    if (editScreen) {
      reset(editScreen)
    } else {
      const color = createCSSColor()
      const value = { ...EmptyInputValues, ...color }

      reset(value)
    }
  }, [editScreen, reset])

  return (
    <Form {...form}>
      <form method='post' onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-10'>
          <div id='screenTag' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              control={control}
              title={formatMessage({ id: 'screen.form.size', defaultMessage: 'Screen Size' })}
              type='number'
              endAdornment='in'
              autoComplete='off'
              placeholder='27'
              isLoading={isEditLoading}
              className='shadow-lg'
            />

            <InputField
              formKey={ScreenDataEnum.aspectRatio}
              control={control}
              title={formatMessage({ id: 'screen.form.aspect', defaultMessage: 'Aspect Ratio' })}
              type='text'
              autoComplete='off'
              placeholder='16:9'
              isLoading={isEditLoading}
              className='shadow-lg'
            />
          </div>

          <div id='screenData' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={ScreenDataEnum.hRes}
              control={control}
              title={formatMessage({ id: 'screen.form.horizontal', defaultMessage: 'Horizontal Res' })}
              type='number'
              endAdornment='px'
              autoComplete='off'
              placeholder='3840'
              isLoading={isEditLoading}
              className='shadow-lg'
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              control={control}
              title={formatMessage({ id: 'screen.form.vertical', defaultMessage: 'Vertical Res' })}
              type='number'
              endAdornment='px'
              autoComplete='off'
              placeholder='2160'
              isLoading={isEditLoading}
              className='shadow-lg'
            />
          </div>

          <div className='flex items-start justify-between'>
            <div className='grid grid-cols-2 gap-6'>
              <ColorField
                formKey={ScreenDataEnum.lightColor}
                title={formatMessage({ id: 'screen.form.light', defaultMessage: 'Light' })}
                mode={LightMode}
                isLoading={isEditLoading}
                control={control}
                className='w-[102px]'
              />
              <ColorField
                formKey={ScreenDataEnum.darkColor}
                title={formatMessage({ id: 'screen.form.dark', defaultMessage: 'Dark' })}
                mode={DarkMode}
                isLoading={isEditLoading}
                control={control}
                className='w-[102px]'
              />
            </div>
            <Button
              type='button'
              className='mt-8 shadow-lg'
              title={formatMessage({ id: 'screen.form.colors', defaultMessage: 'Generate Colors' })}
              dimension='icon-lg'
              data-testid='generate-color-btn'
              mode='outline'
              onMouseDown={() => setToggleAnimation(!toggleAnimation)}
              onClick={generateColorHandler}
              disabled={isEditLoading}
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
              <Button
                type='button'
                className='shadow-lg'
                mode='outline'
                disabled={isCreateLoading || isUpdateLoading || isEditLoading}
                onClick={onClose}
              >
                {' '}
                <FormattedMessage id='screens.form.close' defaultMessage='Close' />
              </Button>
              <Button
                type='button'
                className='shadow-lg'
                mode='outline'
                disabled={isCreateLoading || isUpdateLoading || isEditLoading || !isDirty}
                onClick={resetHandler}
              >
                <FormattedMessage id='screens.form.reset' defaultMessage='Reset' />
              </Button>
            </div>
            <Button
              type='submit'
              className={cn('shadow-lg', {
                'pointer-events-none': isCreateLoading || isUpdateLoading,
              })}
              disabled={!isDirty}
            >
              {isCreateLoading || isUpdateLoading ? (
                <Loader2 data-testid='busySubmitButton' className='animate-spin' />
              ) : !editId ? (
                <FormattedMessage id='screens.form.createButton' defaultMessage='Create' />
              ) : (
                <FormattedMessage id='screens.form.updateButton' defaultMessage='Update' />
              )}
            </Button>
          </div>
        </div>
        {/* <SheetClose asChild>
          <Button type='submit'>Save changes</Button>
        </SheetClose> */}
      </form>
    </Form>
  )
}
