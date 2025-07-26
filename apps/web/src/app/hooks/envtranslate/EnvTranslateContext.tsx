import { createContext, Dispatch } from 'react'

export type EnvTranslate = { locale: string; setLocale: Dispatch<React.SetStateAction<string>> }

export const EnvTranslateContext = createContext<EnvTranslate>({ locale: '', setLocale: () => {} })
