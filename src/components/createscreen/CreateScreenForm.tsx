import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { useCallback, useState } from 'react'
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
import { InputSuffix } from '../input-suffix/InputSuffix'

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

  const onGenerateColor = useCallback(() => {
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
  }, [screenColor, setValue])

  const onSubmit: SubmitHandler<ScreenInput> = useCallback(
    (form: ScreenInput) => {
      createAction(form)
      onGenerateColor()
    },
    [createAction, onGenerateColor],
  )

  const onReset = useCallback(() => {
    reset()
    onGenerateColor()
  }, [onGenerateColor, reset])

  return (
    <>
      <div className='form-control mb-4 flex w-full flex-col'>
        <label className='label'>
          <span className='text-sm'>Choose from list of Monitors</span>
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
                <span className='text-sm'>Screen Size</span>
              </label>
              <InputSuffix suffix='in'>
                <input
                  type='number'
                  autoComplete='off'
                  className={cn('input input-bordered input-md w-full pr-10 shadow-md', {
                    'input-error': errors[ScreenDataEnum.diagonalSize],
                  })}
                  placeholder='27'
                  {...register(ScreenDataEnum.diagonalSize)}
                />
              </InputSuffix>
            </div>

            {/* aspectRation */}
            <div id='aspectRatioControl' className='form-control w-full'>
              <label className='label'>
                <span className='text-sm'>Aspect Ratio</span>
              </label>
              <input
                type='text'
                className={cn('input input-bordered input-md w-full shadow-md', {
                  'input-error': errors[ScreenDataEnum.aspectRatio],
                })}
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
                <span className='text-sm'>Horizontal Res</span>
              </label>
              <InputSuffix suffix='px'>
                <input
                  type='number'
                  autoComplete='off'
                  className={cn('input input-bordered input-md w-full pr-10 shadow-md', {
                    'input-error': errors[ScreenDataEnum.hRes],
                  })}
                  placeholder='1024'
                  {...register(ScreenDataEnum.hRes)}
                />
              </InputSuffix>
            </div>

            {/* vRes */}
            <div id='hSizeControl' className='form-control mb-4 flex flex-col'>
              <label htmlFor={ScreenDataEnum.vRes} className='label'>
                <span className='text-sm'>Vertical Res</span>
              </label>
              <InputSuffix suffix='px'>
                <input
                  type='number'
                  autoComplete='off'
                  className={cn('input input-bordered input-md w-full pr-10 shadow-md', {
                    'input-error': errors[ScreenDataEnum.vRes],
                  })}
                  placeholder='768'
                  {...register(ScreenDataEnum.vRes)}
                />
              </InputSuffix>
            </div>
          </div>

          <div className='divider text-sm'>Theme Color</div>

          <div id='screenColour' className='grid grid-cols-3 gap-3'>
            {/* lightColor */}
            <div id='lightColour' className='form-control mb-4 flex flex-col'>
              <div
                className=' input input-bordered input-md flex w-full items-center justify-center text-black shadow-md'
                style={{ backgroundColor: screenColor?.lightColor }}
              >
                <span className='text-sm'>Light</span>
              </div>
              <input hidden {...register(ScreenDataEnum.lightColor)} />
            </div>
            {/* darkColor */}
            <div id='darkColour' className='form-control mb-4 flex flex-col'>
              <div
                className='input input-bordered flex h-full w-full items-center justify-center text-sm text-white shadow-md'
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
                onClick={onReset}
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
