import RefreshIcon from '@app/assets/icons/Refresh'
import { DarkMode, LightMode } from '@app/components/theme/ThemeConstants'
import { useCreateScreenApi } from '@app/hooks/api/helpers/useCreateScreenApi'
import { useSearchApi } from '@app/hooks/api/helpers/useSearchApi'
import { useUpdateScreenApi } from '@app/hooks/api/helpers/useUpdateScreenApi'
import { yupResolver } from '@hookform/resolvers/yup'
import { ScreenInput } from '@packages/openapi/generated'
import { ScreenDataEnum, SearchScreenItem } from '@packages/openapi/models'
import { AutoCompleteScreen } from '@packages/ui/auto-complete'
import { createCSSColor } from '@packages/utils/ScreenCalc'
import { clsx } from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ColorField } from './ColorField'
import { DefaultInputValues } from './DefaultInputValues'
import { InputField } from './InputField'
import { ScreenFormSchema } from './ScreenFormSchema'

type Props = {
  defaultValues?: ScreenInput | null
  editId?: string
  isLoading: boolean
  onClose?: () => void
}

export const ScreenForm = ({ defaultValues = null, editId = undefined, isLoading, onClose = () => {} }: Props) => {
  const methods = useForm<ScreenInput>({
    resolver: yupResolver(ScreenFormSchema),
    defaultValues: DefaultInputValues(),
    mode: 'onBlur',
  })
  const {
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = methods
  const { isPending: isCreateLoading, mutate: createAction } = useCreateScreenApi()
  const { isPending: isUpdateLoading, mutate: updateAction } = useUpdateScreenApi()
  const [clearSearchHandler, setClearSearchHandler] = useState<() => void>(() => {})

  const [searchTerm, setSearchTerm] = useState<string>('')
  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchApi({ term: searchTerm })

  const [toggleAnimation, setToggleAnimation] = useState<boolean>(false)

  // NOTE: this is a hack to get around the fact that the form is not re-rendering when the defaultValues prop changes
  // Address this at the top level of te form
  const selectHandler = (item: SearchScreenItem) => {
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
  }

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
    clearSearchHandler()
    reset()
  }

  const closeHandler = useCallback(() => {
    clearSearchHandler()
    onClose()
  }, [clearSearchHandler, onClose])

  const submitHandler: SubmitHandler<ScreenInput> = (form: ScreenInput) => {
    ReactGA.event({
      category: 'Submit Button Click',
      action: `Submited ${editId ? 'Update' : 'Create'} Screen Button`,
      label: 'Screens Page',
    })

    if (editId) {
      updateAction({ id: editId, data: form }, { onSuccess: onClose })
    } else {
      createAction({ data: form })
    }
    clearSearchHandler()
    generateColorHandler()
  }

  // preset the form with the selected screen
  useEffect(() => {
    reset(defaultValues ?? DefaultInputValues())
  }, [defaultValues, reset])

  return (
    <FormProvider {...methods}>
      <div className='label label-text'>
        <span className='pb-2 text-xl'>{!editId ? 'Add' : 'Edit'} Screen</span>
      </div>
      <div className='form-control flex w-full flex-col pb-6'>
        <label htmlFor='autoCompleteScreen' className='label label-text'>
          <span className='text-sm'>Choose from list of Monitors</span>
        </label>
        <AutoCompleteScreen
          id='autoCompleteScreen'
          onSelectScreen={selectHandler}
          setClearSearchHandler={setClearSearchHandler}
          isFetching={isSearchListLoading}
          searchList={searchListResponse?.list ?? []}
          onSearch={setSearchTerm}
        />
      </div>

      <form method='post' onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-6'>
          <div id='screenTag' className='grid grid-cols-2 gap-4'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              inputStyle='!pr-10'
              overlayStyle='right-0 mr-4'
              title='Screen Size'
              type='number'
              overlay='in'
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

          <div id='screenData' className='grid grid-cols-2 gap-4'>
            <InputField
              formKey={ScreenDataEnum.hRes}
              inputStyle='!pr-10'
              overlayStyle='right-0 mr-4'
              title='Horizontal Res'
              type='number'
              overlay='px'
              autoComplete='off'
              placeholder='3840'
              isLoading={isLoading}
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              inputStyle='!pr-10'
              overlayStyle='right-0 mr-4'
              title='Vertical Res'
              type='number'
              overlay='px'
              autoComplete='off'
              placeholder='2160'
              isLoading={isLoading}
            />
          </div>

          <div className='flex items-end justify-between pb-8'>
            <div className='flex gap-4'>
              <ColorField
                formKey={ScreenDataEnum.lightColor}
                title='Light'
                mode={LightMode}
                isLoading={isLoading}
                className='w-24'
              />
              <ColorField
                formKey={ScreenDataEnum.darkColor}
                title='Dark'
                mode={DarkMode}
                isLoading={isLoading}
                className='w-24'
              />
            </div>
            <button
              type='button'
              className='btn btn-secondary'
              onMouseDown={() => setToggleAnimation(!toggleAnimation)}
              onClick={generateColorHandler}
              disabled={isLoading}
            >
              <RefreshIcon className='size-6 fill-current transition duration-500' toggleAnimation={toggleAnimation} />
            </button>
          </div>

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
                className='btn btn-secondary'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={closeHandler}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={resetHandler}
              >
                Reset
              </button>
            </div>
            <button
              type='submit'
              className={clsx('btn btn-secondary', { 'pointer-events-none': isCreateLoading || isUpdateLoading })}
              disabled={!isDirty || !isValid}
            >
              {isCreateLoading || isUpdateLoading ? (
                <div data-testid='busySubmitButton' className='loading loading-spinner items-center justify-center' />
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
