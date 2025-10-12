import * as z from 'zod'

export const ScreenFormSchema = z.object({
  diagonalSize: z.coerce.number<number>().gt(0, { message: 'Must be greater than 0' }),
  aspectRatio: z.string().regex(/^\d+:\d+$/, { message: 'Must be look like 16:9' }),
  hRes: z.coerce.number<number>().int('Must be integer').gt(0, { message: 'Must be greater than 0' }),
  vRes: z.coerce.number<number>().int('Must be integer').gt(0, { message: 'Must be greater than 0' }),
  lightColor: z.string().regex(/^#([a-fA-F0-9]{6})\b$/, { message: 'Must be hex format' }),
  darkColor: z.string().regex(/^#([a-fA-F0-9]{6})\b$/, { message: 'Must be hex format' }),
})

export type FormSubmitType = z.infer<typeof ScreenFormSchema>
