import { ScreenInput } from '@/lib/openapi/generated'
import { ScreenDataEnum } from '@/lib/openapi/models/Screen'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'

export const ScreenFormSchema: ObjectSchema<NullableObj<ScreenInput>> = yup.object().shape(
  {
    [ScreenDataEnum.diagonalSize]: yup
      .number()
      .nullable()
      .notOneOf([null])
      // .transform((value, originalValue) => {
      //   if (typeof originalValue === 'string' && originalValue === '') {
      //     return undefined
      //   }
      //   return value
      // })
      .moreThan(0, 'Diagonal size must be greater than 0')
      .required('Diagonal size is required'),
    [ScreenDataEnum.aspectRatio]: yup
      .string()
      .nullable()
      .notOneOf([null])
      .matches(/^\d+:\d+$/, { excludeEmptyString: true, message: 'Aspect ratio must be in the form of 16:9' })
      .required('Aspect ratio is required'),
    [ScreenDataEnum.hRes]: yup
      .number()
      .nullable()
      .notOneOf([null])
      // .optional()
      // .transform((value, originalValue) => {
      //   if (typeof originalValue === 'string' && originalValue === '') {
      //     return undefined
      //   }
      //   return value
      // })
      // .when(ScreenDataEnum.vRes, {
      //   is: (v: number) => v && v > 0,
      //   then: (schema) =>
      //     schema.required('Horizontal required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      // })
      .moreThan(0, 'Horizontal resolution must be greater than 0')
      .required('Horizontal resolution is required'),
    [ScreenDataEnum.vRes]: yup
      .number()
      .nullable()
      .notOneOf([null])
      // .optional()
      // .transform((value, originalValue) => {
      //   if (typeof originalValue === 'string' && originalValue === '') {
      //     return undefined
      //   }
      //   return value
      // })
      // .when(ScreenDataEnum.hRes, {
      //   is: (v: number) => v && v > 0,
      //   then: (schema) =>
      //     schema.required('Vertical required when vertical is provided').moreThan(0, 'Must be greater than 0'),
      // }),
      .moreThan(0, 'Vertical resolution must be greater than 0')
      .required('Vertical resolution is required'),
    [ScreenDataEnum.lightColor]: yup
      .string()
      .nullable()
      .notOneOf([null])
      //.matches(/^#([a-f0-9]{6})\b$/, { excludeEmptyString: true, message: 'Light colour theme' })
      .required('Light color theme is required'),
    [ScreenDataEnum.darkColor]: yup
      .string()
      .nullable()
      .notOneOf([null])
      //.matches(/^#([a-f0-9]{6})\b$/, { excludeEmptyString: true, message: 'Dark colour theme' })
      .required('Dark color theme is required'),
  },
  //[[ScreenDataEnum.hRes, ScreenDataEnum.vRes]],
)
