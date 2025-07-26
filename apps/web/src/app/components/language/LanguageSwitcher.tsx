import { useEnvTranslate } from '@/app/hooks/envtranslate/useEnvTranslate'
import { supportedlocales } from '../envtranslations/LocaleHelper'

export const LanguageSwitcher = () => {
  // Pull in the top-level locale and its setter.
  const { locale, setLocale } = useEnvTranslate()

  return (
    <div>
      <select
        value={locale}
        // Whenever the user selects a locale, update the
        // top-level active locale.
        onChange={(e) => setLocale(e.target.value)}
      >
        {/* The keys of the `locales` config object
            are the locale codes: "en-US", "ar-EG". */}
        {Object.entries(supportedlocales).map(([key, label]) => (
          <option value={key} key={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
