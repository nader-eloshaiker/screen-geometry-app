import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { useInputReferenceContext } from '../../contexts/reference/useInputReferenceContext'
import { ScreenColor, ScreenInput } from '../../generated/openapi/models'
import { useCreateScreen } from '../../hooks/api/useCreateScreen'
import { SearchItem } from '../../models/Database'
import { ScreenDataEnum } from '../../models/Screen'
import { createCSSColor } from '../../utils/ScreenCalc'
import { AutoCompleteScreen } from '../autocomplete/AutoCompleteScreen'
import { InputPlaceholder } from '../inputplaceholder/InputPlaceholder'

const screenDataSchema: ObjectSchema<ScreenInput> = yup.object().shape(
  {
    [ScreenDataEnum.diagonalSize]: yup
      .number()
      .required('Diagonal size is required')
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined
        }
        return value
      })
      .moreThan(0, 'Diagonal size must be greater than 0')
      .required('Diagonal size is required'),
    [ScreenDataEnum.aspectRatio]: yup
      .string()
      .matches(/^\d+:\d+$/, { excludeEmptyString: true, message: 'Aspect ratio must be in the form of 16:9' })
      .required('Aspect ratio is required'),
    [ScreenDataEnum.hRes]: yup
      .number()
      .optional()
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined
        }
        return value
      })
      .when(ScreenDataEnum.vRes, {
        is: (v: number) => v !== undefined && v > 0,
        then: (schema) =>
          schema.required('Horizontal required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      }),
    [ScreenDataEnum.vRes]: yup
      .number()
      .optional()
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined
        }
        return value
      })
      .when(ScreenDataEnum.hRes, {
        is: (v: number) => v !== undefined && v > 0,
        then: (schema) =>
          schema.required('Vertical required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      }),
    [ScreenDataEnum.lightColor]: yup
      .string()
      //.matches(/^#([a-f0-9]{6})\b$/, { excludeEmptyString: true, message: 'Light colour theme' })
      .required('Light color theme is required'),
    [ScreenDataEnum.darkColor]: yup
      .string()
      //.matches(/^#([a-f0-9]{6})\b$/, { excludeEmptyString: true, message: 'Dark colour theme' })
      .required('Dark color theme is required'),
  },
  [[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

export const CreateScreenForm = () => {
  const {
    register,
    formState: { errors, isDirty, isValid },
    setValue,
    handleSubmit,
    reset,
    resetField,
  } = useForm<ScreenInput>({
    resolver: yupResolver(screenDataSchema),
    mode: 'onBlur',
  })
  const { isCreateLoading, createAction } = useCreateScreen()
  const drawerRef = useInputReferenceContext()
  const [screenColor, setScreenColor] = useState<ScreenColor>()

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

  const onSubmit: SubmitHandler<ScreenInput> = (form) => {
    createAction(form)
    onGenerateColor()
  }

  const onGenerateColor = () => {
    setScreenColor(createCSSColor())
  }

  useEffect(() => {
    onGenerateColor()
  }, [])

  useEffect(() => {
    if (!screenColor) return

    setValue(ScreenDataEnum.darkColor, screenColor.darkColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(ScreenDataEnum.lightColor, screenColor.lightColor, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [screenColor, setValue])

  return (
    <>
      <div className='form-control mb-4 flex w-full flex-col'>
        <label className='label'>
          <span className='label-text'>Choose from list of Monitors</span>
        </label>
        <AutoCompleteScreen onSelect={onSelect} />
      </div>

      <div className='divider text-sm'>Or</div>

      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div id='screenTag' className='grid grid-cols-2 gap-3'>
            {/* diagnolSize */}
            <div id='screenSizeControl' className='form-control mb-4 flex flex-col'>
              <label htmlFor={ScreenDataEnum.diagonalSize} className='label'>
                <span className='label-text'>Screen Size</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute right-0 top-0 flex h-full w-10'>
                  <div className='z-10 flex h-full w-full items-center justify-center rounded-r'>in</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.diagonalSize] }) +
                    ' input input-bordered input-md relative w-full pr-10 shadow-md'
                  }
                  placeholder='27'
                  {...register(ScreenDataEnum.diagonalSize)}
                />
              </div>
            </div>

            {/* aspectRation */}
            <div id='aspectRatioControl' className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Aspect Ratio</span>
              </label>
              <input
                type='text'
                className={
                  cn({ 'input-error': errors[ScreenDataEnum.aspectRatio] }) +
                  ' input input-bordered input-md w-full shadow-md'
                }
                autoComplete='off'
                placeholder='16:9'
                {...register(ScreenDataEnum.aspectRatio)}
              />
            </div>
          </div>

          <div className='divider text-sm'>Optional</div>

          <div id='screenData' className='grid grid-cols-2 gap-3'>
            {/* hRes */}
            <div id='hSizeControl' className='form-control mb-4 flex flex-col'>
              <label htmlFor={ScreenDataEnum.hRes} className='label'>
                <span className='label-text'>Horizontal Res</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute right-0 top-0 flex h-full w-10'>
                  <div className='z-10 flex h-full w-full items-center justify-center rounded-r'>px</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.hRes] }) +
                    ' input input-bordered input-md relative w-full pr-10 shadow-md'
                  }
                  placeholder='1024'
                  {...register(ScreenDataEnum.hRes)}
                />
              </div>
            </div>

            {/* vRes */}
            <div id='hSizeControl' className='form-control mb-4 flex flex-col'>
              <label htmlFor={ScreenDataEnum.vRes} className='label'>
                <span className='label-text'>Vertical Res</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute right-0 top-0 flex h-full w-10'>
                  <div className='z-10 flex h-full w-full items-center justify-center rounded-r'>px</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.vRes] }) +
                    ' input input-bordered input-md relative w-full pr-10 shadow-md'
                  }
                  placeholder='768'
                  {...register(ScreenDataEnum.vRes)}
                />
              </div>
            </div>
          </div>

          <div className='divider text-sm'>Theme Color</div>

          <div id='screenColour' className='grid grid-cols-3 gap-3'>
            {/* lightColor */}
            <div id='lightColour' className='form-control mb-4 flex flex-col'>
              <div
                className=' input input-bordered input-md flex w-full items-center justify-center shadow-md'
                style={{ backgroundColor: screenColor?.lightColor }}
              >
                <span className='text-sm'>Light</span>
              </div>
              <input hidden {...register(ScreenDataEnum.lightColor)} />
            </div>
            {/* darkColor */}
            <div id='darkColour' className='form-control mb-4 flex flex-col'>
              <div
                className='input input-bordered flex h-full w-full items-center justify-center text-sm shadow-md'
                style={{ backgroundColor: screenColor?.darkColor }}
              >
                <span className='text-sm'>Dark</span>
              </div>
              <input hidden {...register(ScreenDataEnum.darkColor)} />
            </div>
            <button id='genColorButton' type='button' className='btn btn-neutral' onClick={onGenerateColor}>
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
                className='btn btn-neutral'
                onClick={() => drawerRef?.current?.click()}
              >
                {isCreateLoading ? (
                  <div className='stack'>
                    <span>Cancel</span> <span className='loading loading-spinner' />
                  </div>
                ) : (
                  'Cancel'
                )}
              </button>
              <button
                id='resetButton'
                type='reset'
                className='btn btn-neutral'
                disabled={isCreateLoading}
                onClick={() => reset()}
              >
                {isCreateLoading ? (
                  <div className='stack'>
                    <span>Reset</span> <span className='loading loading-spinner' />
                  </div>
                ) : (
                  'Reset'
                )}
              </button>
            </div>
            <button
              id='submitButton'
              type='submit'
              className='btn btn-neutral'
              disabled={!isDirty || !isValid || isCreateLoading}
            >
              {isCreateLoading ? (
                <div className='stack'>
                  <span>Create</span> <span className='loading loading-spinner' />
                </div>
              ) : (
                'Create'
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
