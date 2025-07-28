import { useEnvTranslate } from '@/app/hooks/envtranslate/useEnvTranslate'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@screengeometry/lib-ui/select'
import { useState } from 'react'
import { supportedlocales } from '../envtranslations/LocaleHelper'

export const LanguageSwitcher = () => {
  // Pull in the top-level locale and its setter.
  const { locale, setLocale } = useEnvTranslate()
  const [open, setOpen] = useState(false)

  return (
    <Select value={locale} onValueChange={setLocale} open={open} onOpenChange={setOpen}>
      <SelectTrigger palette={'secondary'} className='w-[70px] rounded-full'>
        <SelectValue placeholder='Language'>{locale.toUpperCase()}</SelectValue>
      </SelectTrigger>
      <SelectContent palette={'secondary'}>
        {Object.entries(supportedlocales).map(([key, label]) => (
          <SelectItem palette={'secondary'} value={key} key={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
