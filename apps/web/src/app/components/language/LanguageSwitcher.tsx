import { defaultLanguage, defaultLocale } from '@/app/stores/country/CountryUtils'
import { Country } from '@/app/stores/country/EnvCountryContext'
import { useEnvCountry } from '@/app/stores/country/useEnvCountry'
import { useEnvTranslate } from '@/app/stores/translation/useEnvTranslate'
import { Button } from '@screengeometry/lib-ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@screengeometry/lib-ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@screengeometry/lib-ui/popover'
import { cn } from '@screengeometry/lib-ui/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

const findCountry = ({ locale = defaultLocale, countriesList }: { locale: string; countriesList: Array<Country> }) =>
  countriesList.find((country) => country.locale === locale) ??
  countriesList.find((country) => country.locale === defaultLocale)!

const toValue = (locale: string, countriesList: Array<Country>) => findCountry({ locale, countriesList }).searchTags

const localeFromValue = (value: string) => value.split(':')[0]

const CommandLanguageGroup = ({ code, ...rest }: { code: string } & React.ComponentProps<typeof CommandGroup>) => {
  const { languageList = [] } = useEnvCountry()
  const language = useMemo(
    () =>
      languageList.find((language) => language.code === code) ??
      languageList.find((language) => language.code === defaultLanguage)!,
    [code, languageList]
  )

  return <CommandGroup heading={language.native} {...rest} />
}

export const LanguageSwitcher = () => {
  const { formatMessage } = useIntl()
  const { countriesDict = {} } = useEnvCountry()
  const { locale, setLocale } = useEnvTranslate()

  const countriesList = useMemo(() => Object.values(countriesDict).flat(), [countriesDict])

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string>(toValue(locale ?? defaultLocale, countriesList))
  const [selectedCountry, setSelectedCountry] = useState<Country>(() =>
    findCountry({ locale: locale ?? defaultLocale, countriesList })
  )

  useEffect(() => {
    if (selectedValue && countriesList && setLocale) {
      const newLocale = localeFromValue(selectedValue)
      const newCountry = findCountry({ locale: newLocale, countriesList })
      setLocale(newLocale)
      setSelectedCountry(newCountry)
    }
  }, [countriesList, selectedValue, setLocale])

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          mode='outline'
          palette='secondary'
          role='combobox'
          dimension='none'
          aria-expanded={open}
          className='h-10 py-2 pl-3 pr-2 text-base [&_svg]:size-5'
        >
          <span className='text-3xl'>{selectedCountry.emoji}</span>
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='mt-2 border-none p-0'>
        <Command filter={(value, search) => (value.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ? 1 : 0)}>
          <CommandInput
            placeholder={formatMessage({
              id: 'translations.selector.placeholder',
              defaultMessage: 'Search Translation...',
            })}
            className='h-9'
          />
          <CommandList>
            <CommandEmpty>
              <FormattedMessage id='screens.selector.nomatching' defaultMessage='No Matching Screens found' />
            </CommandEmpty>
            {Object.entries(countriesDict).map(([languageCode, countries]) => (
              <CommandLanguageGroup key={languageCode} code={languageCode}>
                {countries.map((country) => (
                  <CommandItem
                    key={country.searchTags}
                    value={country.searchTags}
                    onSelect={(value) => {
                      setSelectedValue(value)
                      setOpen(false)
                    }}
                  >
                    <span className='flex items-center gap-3'>
                      <span className='text-3xl'>{country.emoji}</span>
                      <span>{country.native}</span>
                    </span>
                    <Check className={cn('ml-auto', country.locale === locale ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                ))}
              </CommandLanguageGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
