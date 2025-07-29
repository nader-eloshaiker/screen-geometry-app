import { useEnvTranslate } from '@/app/hooks/envTranslate/useEnvTranslate'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@screengeometry/lib-ui/select'
import { supportedlocales } from '../../hooks/envTranslate/LocaleHelper'

export const LanguageSwitcher = () => {
  // Pull in the top-level locale and its setter.
  const { locale, setLocale } = useEnvTranslate()

  return (
    <Select value={locale} onValueChange={setLocale}>
      <SelectTrigger palette={'secondary'} className='w-[110px] rounded-full'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent palette={'secondary'}>
        {Object.entries(supportedlocales).map(([key, value]) => (
          <SelectItem palette={'secondary'} value={key} key={key}>
            {value.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
