import { defaultLocale } from '@/app/stores/country/CountryUtils'
import { createContext, type Dispatch } from 'react'

export type EnvTranslation = {
  locale: string | undefined
  setLocale: Dispatch<React.SetStateAction<string | undefined>>
}

export const EnvTranslationContext = createContext<EnvTranslation>({
  locale: defaultLocale,
  setLocale: () => {},
})
