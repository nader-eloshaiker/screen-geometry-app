import { GetCountriesQuery } from '@screengeometry/lib-api/spec'
import { createContext, type Dispatch } from 'react'

export type CountriesList = Record<string, Array<GetCountriesQuery['countries']>>

export type EnvTranslation = {
  locale: string
  setLocale: Dispatch<React.SetStateAction<string>>
  countriesList: CountriesList
}

export const EnvTranslationContext = createContext<EnvTranslation>({
  locale: '',
  setLocale: () => {},
  countriesList: {},
})
