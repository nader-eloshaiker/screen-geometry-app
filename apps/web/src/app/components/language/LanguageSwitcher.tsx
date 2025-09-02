import { Country, CountryDictionary } from '@/app/hooks/country/EnvCountryContext'
import { useEnvCountry } from '@/app/hooks/country/useEnvCountry'
import { useEnvTranslate } from '@/app/hooks/translation/useEnvTranslate'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@screengeometry/lib-ui/select'
import { useEffect, useState } from 'react'

const findCountry = (locale: string | null, countryList: CountryDictionary) => {
  if (!locale) {
    return undefined
  }
  const list = Object.values(countryList).flat()
  return list.find((country) => country.locale === locale)
}

export const LanguageSwitcher = () => {
  // Pull in the top-level locale and its setter.
  const { locale, setLocale } = useEnvTranslate()
  const { countriesList = {} } = useEnvCountry()
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(() => findCountry(locale, countriesList))

  useEffect(() => {
    setSelectedCountry(findCountry(locale, countriesList))
  }, [locale, countriesList])

  return (
    <Select value={locale ?? ''} onValueChange={setLocale}>
      <SelectTrigger palette='primary' className='w-20 rounded-lg'>
        <SelectValue placeholder='Language' aria-label={locale ?? ''}>
          <span className='text-2xl'>{selectedCountry?.emoji}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent palette={'secondary'}>
        {Object.entries(countriesList).map(([_langKey, countries]) => (
          <SelectGroup>
            {countries.map((country) => (
              <SelectItem palette={'secondary'} value={country.locale} key={country.locale}>
                <span className='flex items-center gap-3'>
                  <span className='text-3xl'>{country.emoji}</span>
                  <span>{country.native}</span>
                </span>
              </SelectItem>
            ))}
            <SelectSeparator />
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
