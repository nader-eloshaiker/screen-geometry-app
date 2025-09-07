import { createContext } from 'react'

export type Country = {
  searchTags: string
  locale: string
  code: string
  language: Language
  name: string
  native: string
  emoji: string
}
export type CountryDictionary = Record<string, Array<Country>>

export type Language = {
  code: string
  name: string
  native: string
  rtl: boolean
}
export type LanguageList = Array<Language>

export type EnvCountry = {
  countriesDict: CountryDictionary | undefined
  languageList: LanguageList | undefined
  supportedLocaleCodes: Array<string> | undefined
}

export const EnvCountryContext = createContext<EnvCountry>({
  countriesDict: undefined,
  languageList: undefined,
  supportedLocaleCodes: undefined,
})
