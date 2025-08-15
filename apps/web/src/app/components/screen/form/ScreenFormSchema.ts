import { type ScreenInput } from '@screengeometry/lib-api/spec'
import * as yup from 'yup'
import { type InferType, ObjectSchema } from 'yup'

export const ScreenFormSchema: ObjectSchema<NullableObj<ScreenInput>> = yup.object().shape(
  {
    diagonalSize: yup
      .number()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      .moreThan(0, 'Value must be greater than 0')
      .required('Value is required'),
    aspectRatio: yup
      .string()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      .matches(/^\d+:\d+$/, { excludeEmptyString: true, message: 'Must be formatted like 16:9' })
      .required('Value is required'),
    hRes: yup
      .number()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      // .when(ScreenDataEnum.vRes, {
      //   is: (v: number) => v && v > 0,
      //   then: (schema) =>
      //     schema.required('Horizontal required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      // })
      .moreThan(0, 'Must be greater than 0')
      .required('Value is required'),
    vRes: yup
      .number()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      // .when(ScreenDataEnum.hRes, {
      //   is: (v: number) => v && v > 0,
      //   then: (schema) =>
      //     schema.required('Vertical required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      // }),
      .moreThan(0, 'Must be greater than 0')
      .required('Value is required'),
    lightColor: yup
      .string()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      .matches(/^#([a-fA-F0-9]{6})\b$/, { excludeEmptyString: true, message: 'Must be hex format' })
      .required('Value is required'),
    darkColor: yup
      .string()
      .nullable()
      .notOneOf([null])
      .transform((value, originalValue) => {
        if (!originalValue) {
          return null // force (undefined || '') to null
        }
        return value
      })
      .matches(/^#([a-fA-F0-9]{6})\b$/, { excludeEmptyString: true, message: 'Must be hex format' })
      .required('Value is required'),
  }
  //[[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)

export type FormSubmitType = InferType<typeof ScreenFormSchema>

export const EmptyInputValues: FormSubmitType = {
  aspectRatio: null,
  diagonalSize: null,
  hRes: null,
  vRes: null,
  lightColor: null,
  darkColor: null,
}
