import * as z from 'zod'

export const ScreenFormSchema = z.object({
  diagonalSize: z.number().gt(0, 'Value must be greater than 0'),
  aspectRatio: z.string().regex(/^\d+:\d+$/, 'Must be formatted like 16:9'),
  hRes: z.number().gt(0, 'Must be greater than 0'),
  vRes: z.number().gt(0, 'Must be greater than 0'),
  lightColor: z.string().regex(/^#([a-fA-F0-9]{6})\b$/, 'Must be hex format'),
  darkColor: z.string().regex(/^#([a-fA-F0-9]{6})\b$/, 'Must be hex format'),
})

export type FormSubmitType = z.infer<typeof ScreenFormSchema>
