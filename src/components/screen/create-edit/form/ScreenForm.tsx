import { AutoCompleteScreen } from '@components/autocomplete/AutoCompleteScreen'
import { DarkMode, LightMode } from '@components/theme/ThemeConstants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateScreen } from '@hooks/api/helpers/useCreateScreen'
import { useUpdateScreen } from '@hooks/api/helpers/useUpdateScreen'
import { SearchItem } from '@models/Database'
import { ScreenDataEnum } from '@models/Screen'
import { ScreenInput } from '@openapi/generated/models'
import { createCSSColor } from '@utils/ScreenCalc'
import { clsx } from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ColorField } from './ColorField'
import { DefaultInputValues } from './DefaultInputValues'
import { InputField } from './InputField'
import { ScreenFormSchema } from './ScreenFormSchema'

type Props = {
  defaultValues?: ScreenInput
  editId?: string
  isLoading?: boolean
  onCloseAction?: () => void
}

export const ScreenForm = ({
  defaultValues,
  editId = undefined,
  isLoading = false,
  onCloseAction = () => {},
}: Props) => {
  const [resetValue, setResetValue] = useState('')

  const methods = useForm<ScreenInput>({
    resolver: yupResolver(ScreenFormSchema),
    defaultValues: defaultValues ?? DefaultInputValues(),
    mode: 'onBlur',
  })
  const {
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = methods
  const { isPending: isCreateLoading, useMutation: createAction } = useCreateScreen()
  const { isPending: isUpdateLoading, useMutation: updateAction } = useUpdateScreen()

  // preset the form with the selected screen
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues)
    } else {
      reset()
    }
  }, [defaultValues, reset])

  const selectAction = useCallback(
    (item: SearchItem) => {
      setValue(ScreenDataEnum.aspectRatio, item.tag.aspectRatio, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
      if (item.tag.diagonalSize) {
        setValue(ScreenDataEnum.diagonalSize, item.tag.diagonalSize, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      } else {
        resetField(ScreenDataEnum.diagonalSize)
      }
      if (item.spec?.hRes) {
        setValue(ScreenDataEnum.hRes, item.spec?.hRes, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      } else {
        resetField(ScreenDataEnum.hRes)
      }
      if (item.spec?.vRes) {
        setValue(ScreenDataEnum.vRes, item.spec?.vRes, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        })
      } else {
        resetField(ScreenDataEnum.vRes)
      }
    },
    [resetField, setValue],
  )

  const onGenerateColor = useCallback(() => {
    const color = createCSSColor()
    setValue(ScreenDataEnum.darkColor, color.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(ScreenDataEnum.lightColor, color.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [setValue])

  const onReset = useCallback(() => {
    reset()
    setResetValue('')
  }, [reset])

  const onClose = useCallback(() => {
    reset()
    onCloseAction()
  }, [onCloseAction, reset])

  const onSubmit: SubmitHandler<ScreenInput> = useCallback(
    (form: ScreenInput) => {
      if (editId) {
        updateAction({ id: editId, data: form }, { onSuccess: onClose })
      } else {
        createAction({ data: form })
      }
      onGenerateColor()
    },
    [createAction, editId, onClose, onGenerateColor, updateAction],
  )

  return (
    <FormProvider {...methods}>
      <label className='label'>
        <span className='text-lg'>{!editId ? 'Add' : 'Edit'} Screen</span>
      </label>
      <div className='form-control mb-4 flex w-full flex-col'>
        <label className='label'>
          <span className='text-sm'>Choose from list of Monitors</span>
        </label>
        <AutoCompleteScreen onSelect={selectAction} onReset={resetValue} />
      </div>

      <div className='divider text-sm'>Or</div>

      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div id='screenTag' className='grid grid-cols-2 gap-3'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              inputStyle='!pr-10'
              fixStyle='right-0 mr-4'
              title='Screen Size'
              type='number'
              fix='in'
              autoComplete='off'
              placeholder='27"'
              isLoading={isLoading}
            />

            <InputField
              formKey={ScreenDataEnum.aspectRatio}
              title='Aspect Ratio'
              type='text'
              autoComplete='off'
              placeholder='16:9'
              isLoading={isLoading}
            />
          </div>

          <div className='divider text-sm'>Optional</div>

          <div id='screenData' className='grid grid-cols-2 gap-3'>
            <InputField
              formKey={ScreenDataEnum.hRes}
              inputStyle='!pr-10'
              fixStyle='right-0 mr-4'
              title='Horizontal Res'
              type='number'
              fix='px'
              autoComplete='off'
              placeholder='27"'
              isLoading={isLoading}
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              inputStyle='!pr-10'
              fixStyle='right-0 mr-4'
              title='Vertical Res'
              type='number'
              fix='px'
              autoComplete='off'
              placeholder='27"'
              isLoading={isLoading}
            />
          </div>

          <div className='divider text-sm'>Theme Color</div>

          <div className='flex justify-between'>
            <div className='flex gap-4'>
              <ColorField formKey={ScreenDataEnum.lightColor} title='Light' mode={LightMode} isLoading={isLoading} />
              <ColorField formKey={ScreenDataEnum.darkColor} title='Dark' mode={DarkMode} isLoading={isLoading} />
            </div>
            <button type='button' className='btn btn-neutral w-24' onClick={onGenerateColor} disabled={isLoading}>
              Change
            </button>
          </div>

          <div className='divider text-sm'>Finish</div>

          {errors[ScreenDataEnum.diagonalSize] && (
            <div className='text-sm text-error'>{errors[ScreenDataEnum.diagonalSize].message}</div>
          )}
          {errors[ScreenDataEnum.aspectRatio] && (
            <div className='text-sm text-error'>{errors[ScreenDataEnum.aspectRatio].message}</div>
          )}
          {errors[ScreenDataEnum.hRes] && (
            <div className='text-sm text-error'>{errors[ScreenDataEnum.hRes].message}</div>
          )}
          {errors[ScreenDataEnum.vRes] && (
            <div className='text-sm text-error'>{errors[ScreenDataEnum.vRes].message}</div>
          )}

          <div className='flex justify-between'>
            <div className='flex gap-4'>
              <button
                type='button'
                className='btn btn-neutral w-24'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={onClose}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-neutral w-24'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={onReset}
              >
                Reset
              </button>
            </div>
            <button
              type='submit'
              className={clsx('btn btn-neutral w-24', { 'pointer-events-none': isCreateLoading || isUpdateLoading })}
              disabled={!isDirty || !isValid}
            >
              {isCreateLoading || isUpdateLoading ? (
                <div className='loading loading-spinner items-center justify-center' />
              ) : (
                <>{!editId ? 'Create' : 'Update'}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
