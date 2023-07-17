import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useController, UseControllerProps, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { useFetcher } from 'react-router-dom'
import * as yup from 'yup'
import { IScreenData, ScreenDataEnum } from '../../../models/Screen'

const parseFormNumber = (value: string | number | undefined, strict = true) => {
  if (!value || value == null) {
    return strict ? undefined : 0
  }

  if (typeof value === 'string' && value.length === 0) {
    return strict ? undefined : 0
  }

  const parsed = parseFloat(value?.toString())

  return isNaN(parsed) ? undefined : parsed
}

const DiagonalInput = (props: UseControllerProps<IScreenData>) => {
  const { field } = useController(props)

  return (
    <NumericFormat
      name={field.name}
      suffix={'"'}
      allowLeadingZeros={false}
      allowNegative={false}
      decimalScale={1}
      thousandSeparator=','
      onBlur={field.onBlur}
      onChange={(e) => {
        field.onChange(parseFormNumber(e.target.value) as string | number | React.ChangeEvent<Element>) // send data to hook form
      }}
      className='w-full max-w-xs input input-bordered'
      placeholder='27"'
    />
  )
}

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
    control,
    handleSubmit,
  } = useForm<IScreenData>({
    resolver: yupResolver(screenDataSchema),
  })
  const fetcher = useFetcher()
  const onSubmit: SubmitHandler<IScreenData> = (data) => {
    // async request which may result error
    try {
      fetcher.submit({ ...data }, { method: 'post', action: '' })
    } catch (e) {
      // handle your error
    }
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form method='post' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-2'>
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Screen Size (diagnol)</span>
          </label>
          <div id='diagonalSize'>
            <DiagonalInput control={control} name={ScreenDataEnum.diagonalSize} />
            {errors[ScreenDataEnum.diagonalSize] && (
              <div className='max-w-xs text-error'>{errors[ScreenDataEnum.diagonalSize].message}</div>
            )}
          </div>
        </div>
        {/* include validation with required or other standard HTML validation rules */}
        <div className='w-full max-w-xs form-control'>
          <label className='label'>
            <span className='label-text'>Aspect Ratio</span>
          </label>
          <input
            type='text'
            className='w-full max-w-xs input input-bordered'
            placeholder='16:9'
            {...register(ScreenDataEnum.aspectRatio)}
          />
          {/* errors will return when field validation fails  */}
          {errors[ScreenDataEnum.aspectRatio] && (
            <div className='max-w-xs text-error'>{errors[ScreenDataEnum.aspectRatio].message}</div>
          )}
        </div>
        <div className='flex flex-row-reverse pt-2'>
          <button type='submit' className='btn-neutral btn'>
            Create
          </button>
        </div>
      </div>
    </form>
  )
}
