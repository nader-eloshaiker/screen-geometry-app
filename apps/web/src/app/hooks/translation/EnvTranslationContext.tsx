import { createContext, Dispatch } from 'react'

export type EnvTranslation = { locale: string; setLocale: Dispatch<React.SetStateAction<string>> }

export const EnvTranslationContext = createContext<EnvTranslation>({ locale: '', setLocale: () => {} })
