import RefreshIcon from '@/app/assets/icons/Refresh'
import { DarkMode, LightMode } from '@/app/contexts/theme/Theme.types'
import { useCreateScreenApi } from '@/app/hooks/api/helpers/useCreateScreenApi'
import { useSearchApi } from '@/app/hooks/api/helpers/useSearchApi'
import { useUpdateScreenApi } from '@/app/hooks/api/helpers/useUpdateScreenApi'
import { ScreenInput, SearchItem } from '@/lib/openapi/generated'
import { ScreenDataEnum } from '@/lib/openapi/models'
import { ListInput } from '@/lib/ui/list-input'
import { createCSSColor } from '@/lib/utils/ScreenCalc'
import { cn } from '@/lib/utils/class-name'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DefaultInputValues } from './DefaultInputValues'
import { ScreenFormSchema } from './ScreenFormSchema'
import { ColorField } from './fields/ColorField'
import { InputField } from './fields/InputField'

type Props = {
  defaultValues?: ScreenInput | null
  editId?: string
  isLoading: boolean
  onClose?: () => void
}

const ErrorMessage = ({ message }: { message?: string }) => (
  <div role='alert' className='alert alert-error shadow-md'>
    <svg xmlns='http://www.w3.org/2000/svg' className='size-6 shrink-0 stroke-current' fill='none' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
    <span>{message}</span>
  </div>
)

export const ScreenForm = ({ defaultValues = null, editId = undefined, isLoading, onClose = () => {} }: Props) => {
  const methods = useForm<ScreenInput>({
    resolver: yupResolver(ScreenFormSchema),
    defaultValues: DefaultInputValues(),
    mode: 'onSubmit',
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
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})

  const [searchTerm, setSearchTerm] = useState<string>('')
  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchApi({ term: searchTerm })

  const [toggleAnimation, setToggleAnimation] = useState<boolean>(false)

  // NOTE: this is a hack to get around the fact that the form is not re-rendering when the defaultValues prop changes
  // Address this at the top level of te form
  const selectItemHandler = (item: SearchItem) => {
    setValue(ScreenDataEnum.aspectRatio, item.aspectRatio, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
    if (item.diagonalSize) {
      setValue(ScreenDataEnum.diagonalSize, item.diagonalSize, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField(ScreenDataEnum.diagonalSize)
    }
    if (item.hRes) {
      setValue(ScreenDataEnum.hRes, item.hRes, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    } else {
      resetField(ScreenDataEnum.hRes)
    }
    if (item.vRes) {
      setValue(ScreenDataEnum.vRes, item.vRes, {
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
    clearHandler()
    reset()
  }

  const closeHandler = useCallback(() => {
    clearHandler()
    onClose()
  }, [clearHandler, onClose])

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
    clearHandler()
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
      <div className='form-control flex w-full flex-col pb-10'>
        <label htmlFor='searchList' className='label label-text'>
          <span className='text-sm'>Auto fill the form from list of Monitors</span>
        </label>
        <ListInput<SearchItem>
          id='searchList'
          onSelectItem={selectItemHandler}
          setClearHandler={setClearHandler}
          isLoading={isSearchListLoading}
          items={searchListResponse?.list}
          onSearchList={setSearchTerm}
          placeholder='Type to filter list...'
        />
      </div>

      <form method='post' onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-10'>
          <div id='screenTag' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              title='Screen Size'
              type='number'
              overlay='in'
              autoComplete='off'
              placeholder='27'
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

          {errors[ScreenDataEnum.diagonalSize] && (
            <ErrorMessage message={errors[ScreenDataEnum.diagonalSize].message} />
          )}
          {errors[ScreenDataEnum.aspectRatio] && <ErrorMessage message={errors[ScreenDataEnum.aspectRatio].message} />}

          <div id='screenData' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={ScreenDataEnum.hRes}
              title='Horizontal Res'
              type='number'
              overlay='px'
              autoComplete='off'
              placeholder='3840'
              isLoading={isLoading}
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              title='Vertical Res'
              type='number'
              overlay='px'
              autoComplete='off'
              placeholder='2160'
              isLoading={isLoading}
            />
          </div>

          {errors[ScreenDataEnum.hRes] && <ErrorMessage message={errors[ScreenDataEnum.hRes].message} />}
          {errors[ScreenDataEnum.vRes] && <ErrorMessage message={errors[ScreenDataEnum.vRes].message} />}

          <div className='flex items-end justify-between pb-8'>
            <div className='flex gap-6'>
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
              title='Generate Colors'
              data-testid='generate-color-btn'
              className='btn btn-primary shadow-md'
              onMouseDown={() => setToggleAnimation(!toggleAnimation)}
              onClick={generateColorHandler}
              disabled={isLoading}
            >
              <RefreshIcon className='size-6 fill-current transition duration-500' toggleAnimation={toggleAnimation} />
            </button>
          </div>

          <div className='flex justify-between'>
            <div className='flex gap-6'>
              <button
                type='button'
                className='btn btn-primary shadow-md'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={closeHandler}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary shadow-md'
                disabled={isCreateLoading || isUpdateLoading || isLoading}
                onClick={resetHandler}
              >
                Reset
              </button>
            </div>
            <button
              type='submit'
              className={cn('btn btn-primary shadow-md', {
                'pointer-events-none': isCreateLoading || isUpdateLoading,
              })}
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
