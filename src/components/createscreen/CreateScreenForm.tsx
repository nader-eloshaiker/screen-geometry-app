import { yupResolver } from '@hookform/resolvers/yup'
import cn from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'
import { ScreenInput } from '../../generated/openapi/models'
import { useCreateScreen } from '../../hooks/api/useCreateScreen'
import { SearchItem } from '../../models/Database'
import { ScreenDataEnum } from '../../models/Screen'
import AutoCompleteScreen from '../autocomplete/AutoCompleteScreen'
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
  },
  [[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

export default function CreateScreenForm() {
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

  const onSelect = (item: SearchItem) => {
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
  }
  const onSubmit: SubmitHandler<ScreenInput> = (form) => {
    createAction(form)
  }

  return (
    <>
      <div className='w-full form-control'>
        <label className='label'>
          <span className='label-text'>Choose from list of Monitors</span>
        </label>
        <AutoCompleteScreen onSelect={onSelect} />
      </div>

      <div className='text-sm divider'>Or</div>

      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div id='screenTag' className='grid grid-cols-2 gap-3'>
            {/* diagnolSize */}
            <div id='screenSizeControl' className='flex flex-col mb-4 form-control'>
              <label htmlFor={ScreenDataEnum.diagonalSize} className='label'>
                <span className='label-text'>Screen Size</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute top-0 right-0 flex w-10 h-full'>
                  <div className='z-10 flex items-center justify-center w-full h-full rounded-tr rounded-br'>in</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.diagonalSize] }) +
                    ' relative pr-10 w-full input-bordered input input-md'
                  }
                  placeholder='27'
                  {...register(ScreenDataEnum.diagonalSize)}
                />
              </div>
            </div>

            {/* aspectRation */}
            <div id='aspectRatioControl' className='w-full form-control'>
              <label className='label'>
                <span className='label-text'>Aspect Ratio</span>
              </label>
              <input
                type='text'
                className={
                  cn({ 'input-error': errors[ScreenDataEnum.aspectRatio] }) + ' w-full input input-bordered input-md'
                }
                autoComplete='off'
                placeholder='16:9'
                {...register(ScreenDataEnum.aspectRatio)}
              />
            </div>
          </div>

          <div className='text-sm divider'>Optional</div>

          <div id='screenData' className='grid grid-cols-2 gap-3 grrid'>
            {/* hRes */}
            <div id='hSizeControl' className='flex flex-col mb-4 form-control'>
              <label htmlFor={ScreenDataEnum.hRes} className='label'>
                <span className='label-text'>Horizontal Res</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute top-0 right-0 flex w-10 h-full'>
                  <div className='z-10 flex items-center justify-center w-full h-full rounded-tr rounded-br'>px</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.hRes] }) +
                    ' relative pr-10 w-full input-bordered input input-md'
                  }
                  placeholder='1024'
                  {...register(ScreenDataEnum.hRes)}
                />
              </div>
            </div>

            {/* vRes */}
            <div id='hSizeControl' className='flex flex-col mb-4 form-control'>
              <label htmlFor={ScreenDataEnum.vRes} className='label'>
                <span className='label-text'>Vertical Res</span>
              </label>
              <div className='relative'>
                <InputPlaceholder className='absolute top-0 right-0 flex w-10 h-full'>
                  <div className='z-10 flex items-center justify-center w-full h-full rounded-tr rounded-br'>px</div>
                </InputPlaceholder>

                <input
                  type='number'
                  autoComplete='off'
                  className={
                    cn({ 'input-error': errors[ScreenDataEnum.vRes] }) +
                    ' relative pr-10 w-full input-bordered input input-md'
                  }
                  placeholder='768'
                  {...register(ScreenDataEnum.vRes)}
                />
              </div>
            </div>
          </div>

          {errors[ScreenDataEnum.diagonalSize] && (
            <div className='text-xs text-error'>{errors[ScreenDataEnum.diagonalSize].message}</div>
          )}
          {errors[ScreenDataEnum.aspectRatio] && (
            <div className='text-xs text-error'>{errors[ScreenDataEnum.aspectRatio].message}</div>
          )}
          {errors[ScreenDataEnum.hRes] && (
            <div className='text-xs text-error'>{errors[ScreenDataEnum.hRes].message}</div>
          )}
          {errors[ScreenDataEnum.vRes] && (
            <div className='text-xs text-error'>{errors[ScreenDataEnum.vRes].message}</div>
          )}

          <div className='flex flex-row justify-between mt-2'>
            <button
              id='resetButton'
              type='reset'
              className='btn-neutral btn'
              disabled={!isDirty || isCreateLoading}
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
            <button
              id='submitButton'
              type='submit'
              className='btn-neutral btn'
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
