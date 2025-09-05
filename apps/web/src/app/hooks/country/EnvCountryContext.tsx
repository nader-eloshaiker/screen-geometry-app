import { createContext } from 'react'

export type Country = {
  locale: string
  countryCode: string
  languageCode: string
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
  countriesList: CountryDictionary | undefined
  languageList: LanguageList | undefined
  supportedLocaleCodes: Array<string> | undefined
}

export const EnvCountryContext = createContext<EnvCountry>({
  countriesList: undefined,
  languageList: undefined,
  supportedLocaleCodes: undefined,
})
