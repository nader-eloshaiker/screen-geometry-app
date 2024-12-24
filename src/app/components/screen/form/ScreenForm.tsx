import RefreshIcon from '@/app/assets/icons/Refresh'
import { DarkMode, LightMode } from '@/app/contexts/theme/Theme.types'
import { useCreateScreenApi } from '@/app/hooks/api/helpers/useCreateScreenApi'
import { useSearchApi } from '@/app/hooks/api/helpers/useSearchApi'
import { useUpdateScreenApi } from '@/app/hooks/api/helpers/useUpdateScreenApi'
import { ScreenInput, SearchItem } from '@/lib/openapi/generated'
import { ScreenDataEnum } from '@/lib/openapi/models'
import { Button } from '@/lib/ui/components/button/Button'
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/lib/ui/components/sheet/Sheet'
import { ListInput } from '@/lib/ui/list-input'
import { cn, createCSSColor } from '@/lib/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactGA from 'react-ga4'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import { EmptyInputValues, FormSubmitType, ScreenFormSchema } from './ScreenFormSchema'
import { ColorField } from './fields/ColorField'
import { InputField } from './fields/InputField'

type Props = TReactChildren & {
  setOpen: Dispatch<SetStateAction<boolean>>
  isEditLoading?: boolean
  editId?: string
  editScreen?: FormSubmitType
}

export const ScreenForm = ({ setOpen, editId, isEditLoading, editScreen }: Props) => {
  const { isPending: isCreateLoading, mutate: createAction } = useCreateScreenApi()
  const { isPending: isUpdateLoading, mutate: updateAction } = useUpdateScreenApi()

  const methods = useForm<FormSubmitType>({
    resolver: yupResolver(ScreenFormSchema),
    defaultValues: EmptyInputValues,
    mode: 'onSubmit',
  })
  const {
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = methods
  const [clearHandler, setClearHandler] = useState<() => void>(() => {})

  const [searchTerm, setSearchTerm] = useState<string>('')
  const { isFetching: isSearchListLoading, data: searchListResponse } = useSearchApi({ term: searchTerm })

  const [toggleAnimation, setToggleAnimation] = useState<boolean>(false)

  const onClose = () => {
    setOpen(false)
  }

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
    <FormProvider {...methods}>
      <form method='post' onSubmit={handleSubmit(submitHandler)} className='overflow-auto p-6'>
        <SheetHeader>
          <SheetTitle>{editId ? 'Edit' : 'Create'} Screen</SheetTitle>
          <SheetDescription>
            {editId ? 'Make changes to your Screen here.' : 'Create a new Screen by entering in the specs.'}
          </SheetDescription>
        </SheetHeader>
        <div className='form-control flex w-full flex-col py-10'>
          <label htmlFor='searchList' className='label label-text'>
            <span className='text-sm'>Pre fill the form from list of Monitors</span>
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

        <div className='flex flex-col gap-10'>
          <div id='screenTag' className='grid grid-cols-2 gap-6'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              title='Screen Size'
              type='number'
              overlay='in'
              autoComplete='off'
              placeholder='27'
              isLoading={isEditLoading}
            />

            <InputField
              formKey={ScreenDataEnum.aspectRatio}
              title='Aspect Ratio'
              type='text'
              autoComplete='off'
              placeholder='16:9'
              isLoading={isEditLoading}
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
              isLoading={isEditLoading}
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              title='Vertical Res'
              type='number'
              overlay='px'
              autoComplete='off'
              placeholder='2160'
              isLoading={isEditLoading}
            />
          </div>

          {errors[ScreenDataEnum.hRes] && <ErrorMessage message={errors[ScreenDataEnum.hRes].message} />}
          {errors[ScreenDataEnum.vRes] && <ErrorMessage message={errors[ScreenDataEnum.vRes].message} />}

          <div className='flex items-end justify-between pb-8'>
            <ColorField
              formKey={ScreenDataEnum.lightColor}
              title='Light'
              mode={LightMode}
              isLoading={isEditLoading}
              className='w-24'
            />
            <ColorField
              formKey={ScreenDataEnum.darkColor}
              title='Dark'
              mode={DarkMode}
              isLoading={isEditLoading}
              className='w-24'
            />
            <button
              type='button'
              title='Generate Colors'
              data-testid='generate-color-btn'
              className='btn btn-primary shadow-md'
              onMouseDown={() => setToggleAnimation(!toggleAnimation)}
              onClick={generateColorHandler}
              disabled={isEditLoading}
            >
              <RefreshIcon className='size-6 fill-current transition duration-500' toggleAnimation={toggleAnimation} />
            </button>
          </div>
        </div>
        <SheetFooter>
          <div className='flex w-full justify-between'>
            <div className='flex gap-6'>
              <Button
                type='button'
                className='shadow-lg'
                mode='outline'
                disabled={isCreateLoading || isUpdateLoading || isEditLoading}
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                type='button'
                className='shadow-lg'
                mode='outline'
                disabled={isCreateLoading || isUpdateLoading || isEditLoading || !isDirty}
                onClick={resetHandler}
              >
                Reset
              </Button>
            </div>
            <Button
              type='submit'
              className={cn('shadow-lg', {
                'pointer-events-none': isCreateLoading || isUpdateLoading,
              })}
              disabled={!isDirty || !isValid}
            >
              {isCreateLoading || isUpdateLoading ? (
                <div data-testid='busySubmitButton' className='loading loading-spinner items-center justify-center' />
              ) : (
                <>{!editId ? 'Create' : 'Update'}</>
              )}
            </Button>
          </div>
          {/* <SheetClose asChild>
          <Button type='submit'>Save changes</Button>
        </SheetClose> */}
        </SheetFooter>
      </form>
    </FormProvider>
  )
}
