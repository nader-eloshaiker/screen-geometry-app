import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormDrawerActionTypes, FormDrawerMode } from '../../../../contexts/FormDrawer/FormDrawerManager'
import { useFormDrawerContext } from '../../../../contexts/FormDrawer/useFormDrawaerContext'
import { ScreenColor, ScreenInput } from '../../../../generated/openapi/models'
import { useCreateScreen } from '../../../../hooks/api/useCreateScreen'
import { FindScreenOptions, useFindScreen } from '../../../../hooks/api/useFindScreens'
import { SearchItem } from '../../../../models/Database'
import { ScreenDataEnum } from '../../../../models/Screen'
import { createCSSColor } from '../../../../utils/ScreenCalc'
import { transformScreenItem } from '../../../../utils/ScreenTransformation'
import { AutoCompleteScreen } from '../../../autocomplete/AutoCompleteScreen'
import { DarkMode, LightMode } from '../../../theme/ThemeConstants'
import { ColorField } from './ColorField'
import { InputField } from './InputField'
import { ScreenFormSchema } from './ScreenFormSchema'

export const ScreenForm = () => {
  const methods = useForm<ScreenInput>({
    resolver: yupResolver(ScreenFormSchema),
    mode: 'onBlur',
  })
  const {
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = methods
  const { isCreateLoading, createAction } = useCreateScreen()
  const [screenColor, setScreenColor] = useState<ScreenColor>(() => {
    const color = createCSSColor()
    setValue(ScreenDataEnum.darkColor, color.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(ScreenDataEnum.lightColor, color.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })

    return color
  })

  const { formDrawerState, dispatchFormDrawer } = useFormDrawerContext()
  const [editScreen, setEditScreen] = useState<ScreenInput | undefined>(undefined)
  const [searchValue, setSearchValue] = useState('')

  const queryOptions: FindScreenOptions = {
    enabled: formDrawerState.mode === FormDrawerMode.Edit && !!formDrawerState.id,
    keepPreviousData: true,
  }
  const { screenItemResponse } = useFindScreen(formDrawerState.id ?? '', queryOptions)
  useEffect(() => {
    if (screenItemResponse) {
      const inputScreen = transformScreenItem(screenItemResponse.item)
      setEditScreen(inputScreen)
    }
  }, [screenItemResponse])
  useEffect(() => {
    reset(editScreen)
  }, [editScreen, reset])

  const onSelect = useCallback(
    (item: SearchItem) => {
      setValue(ScreenDataEnum.aspectRatio, item.tag.aspectRatio, {
        shouldValidate: true,
        shouldDirty: true,
      })
      if (item.tag.diagonalSize) {
        setValue(ScreenDataEnum.diagonalSize, item.tag.diagonalSize, {
          shouldValidate: true,
          shouldDirty: true,
        })
      } else {
        resetField(ScreenDataEnum.diagonalSize)
      }
      if (item.spec?.hRes) {
        setValue(ScreenDataEnum.hRes, item.spec?.hRes, {
          shouldValidate: true,
          shouldDirty: true,
        })
      } else {
        resetField(ScreenDataEnum.hRes)
      }
      if (item.spec?.vRes) {
        setValue(ScreenDataEnum.vRes, item.spec?.vRes, {
          shouldValidate: true,
          shouldDirty: true,
        })
      } else {
        resetField(ScreenDataEnum.vRes)
      }
    },
    [resetField, setValue],
  )

  const onGenerateColor = () => {
    const color = createCSSColor()
    setScreenColor(color)
    setValue(ScreenDataEnum.darkColor, screenColor.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(ScreenDataEnum.lightColor, screenColor.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const onSubmit: SubmitHandler<ScreenInput> = (form: ScreenInput) => {
    createAction(form)
    onGenerateColor()
  }

  const onReset = () => {
    reset()
    onGenerateColor()
    setSearchValue('')
  }

  return (
    <FormProvider {...methods}>
      <label className='label'>
        <span className='text-lg'>Add Screen</span>
      </label>
      <div className='form-control mb-4 flex w-full flex-col'>
        <label className='label'>
          <span className='text-sm'>Choose from list of Monitors</span>
        </label>
        <AutoCompleteScreen onSelect={onSelect} searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <div className='divider text-sm'>Or</div>

      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div id='screenTag' className='grid grid-cols-2 gap-3'>
            <InputField
              formKey={ScreenDataEnum.diagonalSize}
              title='Screen Size'
              type='number'
              fix='in'
              autoComplete='off'
              placeholder='27"'
            />

            <InputField
              formKey={ScreenDataEnum.aspectRatio}
              title='Aspect Ratio'
              type='text'
              autoComplete='off'
              placeholder='16:9'
            />
          </div>

          <div className='divider text-sm'>Optional</div>

          <div id='screenData' className='grid grid-cols-2 gap-3'>
            <InputField
              formKey={ScreenDataEnum.hRes}
              title='Horizontal Res'
              type='number'
              fix='px'
              autoComplete='off'
              placeholder='27"'
            />

            <InputField
              formKey={ScreenDataEnum.vRes}
              title='Vertical Res'
              type='number'
              fix='px'
              autoComplete='off'
              placeholder='27"'
            />
          </div>

          <div className='divider text-sm'>Theme Color</div>

          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <ColorField
                formKey={ScreenDataEnum.lightColor}
                title='Light'
                color={screenColor?.lightColor}
                mode={LightMode}
              />
              <ColorField
                formKey={ScreenDataEnum.darkColor}
                title='Dark'
                color={screenColor?.darkColor}
                mode={DarkMode}
              />
            </div>
            <button id='genColorButton' type='button' className='btn btn-neutral w-24' onClick={onGenerateColor}>
              Change
            </button>
          </div>

          <div className='divider' />

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

          <div className='mt-2 flex justify-between'>
            <div className='flex gap-2'>
              <button
                id='cancelButton'
                type='button'
                className='btn btn-neutral w-24'
                disabled={isCreateLoading}
                onClick={() => dispatchFormDrawer({ type: FormDrawerActionTypes.Toggle, payload: { open: false } })}
              >
                close
              </button>
              <button
                id='resetButton'
                type='reset'
                className='btn btn-neutral w-24'
                disabled={isCreateLoading}
                onClick={onReset}
              >
                Reset
              </button>
            </div>
            <button
              id='submitButton'
              type='submit'
              className={cn('btn btn-neutral w-24', { 'pointer-events-none': isCreateLoading })}
              disabled={!isDirty || !isValid}
            >
              {isCreateLoading ? (
                <div className='stack items-center justify-center'>
                  <div className='loading loading-spinner' />
                  <div>{!editScreen ? 'Create' : 'Update'}</div>
                </div>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
