import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useController, UseControllerProps, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
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

export default function CreateScreen() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    control,
  } = useForm<IScreenData>({
    resolver: yupResolver(screenDataSchema),
  })
  const onSubmit: SubmitHandler<IScreenData> = (data) => console.log(data)

  // console.log(watch(ScreenDataEnum.diagonalSize)) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='w-full max-w-xs form-control'>
        <label className='label'>
          <span className='label-text'>Screen Size (diagnol)</span>
        </label>
        <div id='diagonalSize'>
          <DiagonalInput control={control} name={ScreenDataEnum.diagonalSize} />
          {errors[ScreenDataEnum.diagonalSize] && <span>{errors[ScreenDataEnum.diagonalSize].message}</span>}
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
        {errors[ScreenDataEnum.aspectRatio] && <span>{errors[ScreenDataEnum.aspectRatio].message}</span>}
      </div>
      <input type='submit' />
    </form>
  )
}
