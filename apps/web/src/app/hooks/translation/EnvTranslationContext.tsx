import { createContext, type Dispatch } from 'react'

export type EnvTranslation = {
  locale: string | null
  setLocale: Dispatch<React.SetStateAction<string | null>>
}

export const EnvTranslationContext = createContext<EnvTranslation>({
  locale: null,
  setLocale: () => {},
})
