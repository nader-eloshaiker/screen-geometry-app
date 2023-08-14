import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useCreateScreenAction } from '../../api/actions/useCreateScreenAction'
import { ISearch } from '../../models/Database'
import { IScreenDataInput, ScreenDataEnum } from '../../models/Screen'
import AutocompleteScreen from './AutocompleteScreen'
import './CreateScreenForm.css'

const screenDataSchema = yup
  .object({
    [ScreenDataEnum.diagonalSize]: yup
      .number()
      .moreThan(0, 'Diagonal size must be greater than 0')
      .required('Diagonal size is required'),
    [ScreenDataEnum.aspectRatio]: yup
      .string()
      .matches(/^\d+:\d+$/, { excludeEmptyString: true, message: 'Aspect ratio must be in the form of 16:9' })
      .required('Aspect ratio is required'),
  })
  .required()

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
      <AutocompleteScreen
        onSelect={onSelect}
        className='z-20 flex-col overflow-auto rounded-md dropdown-content bg-base-200 top-14 max-h-60'
      />

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form method='post' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-2'>
          <div className='w-full form-control'>
            <label className='label'>
              <span className='label-text'>Screen Size (Diagnol)</span>
            </label>
            <div id='diagonalSize'>
              <div className='flex flex-row items-center gap-0 flex-nowrap'>
                <input
                  type='number'
                  autoComplete='off'
                  className='w-full rounded-l-lg rounded-r-none grow input input-md'
                  placeholder='27'
                  {...register(ScreenDataEnum.diagonalSize)}
                />
                <input
                  type='text'
                  id='suffix'
                  className='flex-none w-24 rounded-l-none rounded-r-lg input input-md'
                  placeholder='inches'
                  disabled
                />
              </div>
              {errors[ScreenDataEnum.diagonalSize] && (
                <div className='text-error'>{errors[ScreenDataEnum.diagonalSize].message}</div>
              )}
            </div>
          </div>
          {/* include validation with required or other standard HTML validation rules */}
          <div className='w-full form-control'>
            <label className='label'>
              <span className='label-text'>Aspect Ratio</span>
            </label>
            <input
              type='text'
              className='w-full input input-bordered input-md'
              autoComplete='off'
              placeholder='16:9'
              {...register(ScreenDataEnum.aspectRatio)}
            />
            {/* errors will return when field validation fails  */}
            {errors[ScreenDataEnum.aspectRatio] && (
              <div className='text-error'>{errors[ScreenDataEnum.aspectRatio].message}</div>
            )}
          </div>
          <div className='flex flex-row-reverse pt-2'>
            <button type='submit' className='btn-neutral btn'>
              Create
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
