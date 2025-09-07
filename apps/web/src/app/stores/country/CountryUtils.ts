import { GetCountriesQuery, GetLanguagesQuery } from '@screengeometry/lib-api/spec'
import { Country, Language } from './EnvCountryContext'

export const supportedLanguageCodes: Array<string> = [
  'en', // English
  'de', // German
  'el', // Greek
  'mk', // Macedonian
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'pt', // Portuguese
  'nl', // Dutch
  'ar', // Arabic
  'fa', // Farsi
  'hi', // Hindi
  'ta', // Tamil
  'si', // Sinhala
  'ja', // Japanese
  'ko', // Korean
  'zh', // Chinese
]

export const defaultLanguage = 'en'
export const defaultLocale = 'en-US'

export const generateSearchIndex = (country: GetCountriesQuery['countries'][number], languageCode: string) => {
  const language = country.languages.find((language) => language.code === languageCode)!
  return `${language.code}-${country.code}:${country.name.toLowerCase()}:${country.native}:${language.name.toLowerCase()}:${language.native}`
}

export const toCountryDictionary = (countries: GetCountriesQuery['countries']) => {
  const codes: Array<string> = []
  // Genreate a record of countries by a supported language
  const record = supportedLanguageCodes.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: countries
        .filter((country) => country.languages.some((lang) => lang.code === currentValue))
        .map((country) => {
          codes.push(`${currentValue}-${country.code}`)
          return {
            searchTags: generateSearchIndex(country, currentValue),
            locale: `${currentValue}-${country.code}`,
            code: country.code,
            language: country.languages.find((lang) => lang.code === currentValue)!,
            name: country.name,
            native: country.native,
            emoji: country.emoji,
          } satisfies Country
        }),
    }),
    {}
  )

  return {
    record,
    codes,
  }
}

export const toLanguageList = (languages: GetLanguagesQuery['languages']) => {
  return supportedLanguageCodes
    .map((key) => languages.find((lang) => lang.code === key))
    .filter((item) => !!item)
    .map((item) => ({
      code: item.code,
      name: item.name,
      native: item.native,
      rtl: item.rtl,
    })) satisfies Array<Language>
}
