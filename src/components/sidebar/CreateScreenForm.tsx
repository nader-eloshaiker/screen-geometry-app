import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCreateScreenAction } from '../../api/actions/useCreateScreenAction'
import { ISearch } from '../../models/Database'
import { IScreenDataInput, ScreenDataEnum } from '../../models/Screen'
import AutocompleteScreen from './AutocompleteScreen'
import './CreateScreenForm.css'

const screenDataSchema = yup.object().shape(
  {
    [ScreenDataEnum.diagonalSize]: yup
      .number()
      .moreThan(0, 'Diagonal size must be greater than 0')
      .required('Diagonal size is required'),
    [ScreenDataEnum.aspectRatio]: yup
      .string()
      .matches(/^\d+:\d+$/, { excludeEmptyString: true, message: 'Aspect ratio must be in the form of 16:9' })
      .required('Aspect ratio is required'),
    [ScreenDataEnum.hRes]: yup
      .number()
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined
        }
        return value
      })
      .optional()
      .when(ScreenDataEnum.vRes, {
        is: (v: number) => v !== undefined && v > 0,
        then: (schema) => schema.required('Required when vertical is provided').moreThan(0, 'Must be greater than 0'),
        otherwise: (schema) => schema.notRequired(),
      }),
    [ScreenDataEnum.vRes]: yup
      .number()
      .transform((value, originalValue) => {
        if (typeof originalValue === 'string' && originalValue === '') {
          return undefined
        }
        return value
      })
      .optional()
      .when(ScreenDataEnum.hRes, {
        is: (v: number) => v !== undefined && v > 0,
        then: (schema) => schema.required('Required when vertical is provided').moreThan(0, 'Must be greater than 0'),
        otherwise: (schema) => schema.notRequired(),
      }),
  },
  [[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

export default function CreateScreenForm() {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<IScreenDataInput>({
    resolver: yupResolver(screenDataSchema),
  })
  const [{ executeCreate }] = useCreateScreenAction()

  const onSelect = (item: ISearch) => {
    console.log(item)
    setValue(ScreenDataEnum.aspectRatio, item.tag.aspectRatio, {
      shouldValidate: true,
      shouldDirty: true,
    })
    if (item.tag.diagonalSize) {
      setValue(ScreenDataEnum.diagonalSize, item.tag.diagonalSize, {
        shouldValidate: true,
        shouldDirty: true,
      })
    }
  }
  const onSubmit: SubmitHandler<IScreenDataInput> = (form) => {
    executeCreate(form)
  }

  return (
    <>
      <div className='w-full form-control'>
        <label className='label'>
          <span className='label-text'>Prepopulate from list of Monitors</span>
        </label>
        <AutocompleteScreen onSelect={onSelect} />
      </div>

      <div className='text-sm divider'>Or</div>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div id='screenTag' className='flex flex-row gap-2'>
            <div id='diagnolSizeControl' className='w-full form-control'>
              <label className='label'>
                <span className='label-text'>Screen Size</span>
              </label>
              <div id='diagonalSize'>
                <div className='flex flex-row items-center gap-0 flex-nowrap'>
                  <input
                    type='number'
                    autoComplete='off'
                    className={`w-full rounded-l-lg rounded-r-none grow input input-md${
                      errors[ScreenDataEnum.aspectRatio] && ' input-error'
                    }`}
                    placeholder='27'
                    {...register(ScreenDataEnum.diagonalSize)}
                  />
                  <input
                    type='text'
                    id='suffix'
                    className='flex-none pl-1 rounded-l-none rounded-r-lg w-9 input input-md'
                    placeholder='in'
                    disabled
                  />
                </div>
                {errors[ScreenDataEnum.diagonalSize] && (
                  <div className='text-xs text-error'>{errors[ScreenDataEnum.diagonalSize].message}</div>
                )}
              </div>
            </div>
            {/* include validation with required or other standard HTML validation rules */}
            <div id='as[ectRationControl' className='w-full form-control'>
              <label className='label'>
                <span className='label-text'>Aspect Ratio</span>
              </label>
              <input
                type='text'
                className={`w-full input input-bordered input-md${
                  errors[ScreenDataEnum.aspectRatio] && ' input-error'
                }`}
                autoComplete='off'
                placeholder='16:9'
                {...register(ScreenDataEnum.aspectRatio)}
              />
              {/* errors will return when field validation fails  */}
              {errors[ScreenDataEnum.aspectRatio] && (
                <div className='text-xs text-error'>{errors[ScreenDataEnum.aspectRatio].message}</div>
              )}
            </div>
          </div>
          <div className='text-sm divider'>Optional</div>
          <div id='screenData' className='flex flex-row gap-2'>
            <div id='hResControl' className='w-full form-control'>
              <label className='label'>
                <span className='label-text'>Horizontal</span>
              </label>
              <div id='hRes'>
                <div className='flex flex-row items-center gap-0 flex-nowrap'>
                  <input
                    type='number'
                    autoComplete='off'
                    className={`w-full rounded-l-lg rounded-r-none grow input input-md${
                      errors[ScreenDataEnum.hRes] && ' input-error'
                    }`}
                    placeholder='1024'
                    {...register(ScreenDataEnum.hRes)}
                  />
                  <input
                    type='text'
                    id='suffix'
                    className='flex-none pl-1 rounded-l-none rounded-r-lg w-9 input input-md'
                    placeholder='px'
                    disabled
                  />
                </div>
                {errors[ScreenDataEnum.hRes] && (
                  <div className='text-xs text-error'>{errors[ScreenDataEnum.hRes].message}</div>
                )}
              </div>
            </div>
            <div id='vResControl' className='w-full form-control'>
              <label className='label'>
                <span className='label-text'>Vertical</span>
              </label>
              <div id='vRes'>
                <div className='flex flex-row items-center gap-0 flex-nowrap'>
                  <input
                    type='number'
                    autoComplete='off'
                    className={`w-full rounded-l-lg rounded-r-none grow input input-md${
                      errors[ScreenDataEnum.vRes] && ' input-error'
                    }`}
                    placeholder='768'
                    {...register(ScreenDataEnum.vRes)}
                  />
                  <input
                    type='text'
                    id='suffix'
                    className='flex-none pl-1 rounded-l-none rounded-r-lg w-9 input input-md'
                    placeholder='px'
                    disabled
                  />
                </div>
                {errors[ScreenDataEnum.vRes] && (
                  <div className='text-xs text-error'>{errors[ScreenDataEnum.vRes].message}</div>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-row-reverse pt-2'>
            <button id='submitButton' type='submit' className='btn-neutral btn'>
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
