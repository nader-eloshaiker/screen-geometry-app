import { ScreenDataEnum } from '@models/Screen'
import { ScreenInput } from '@openapi/generated/models'
import * as yup from 'yup'
import { ObjectSchema } from 'yup'

export const ScreenFormSchema: ObjectSchema<ScreenInput> = yup.object().shape(
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
        is: (v: number) => v && v > 0,
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
        is: (v: number) => v && v > 0,
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
