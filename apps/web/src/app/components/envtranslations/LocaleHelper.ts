const getBrowserLocales = () => {
  const result = []

  // List of languages the user set in their
  // browser settings.
  if (navigator.languages) {
    for (const lang of navigator.languages) {
      result.push(lang)
    }
  }

  // UI language: language of browser and probably
  // operating system.
  if (navigator.language) {
    result.push(navigator.language)
  }

  return result
}

const supportedlocales: Record<string, { dir: 'ltr' | 'rtl'; label: string }> = {
  en: { dir: 'ltr', label: 'English' },
  de: { dir: 'ltr', label: 'Deutsch' },
  es: { dir: 'ltr', label: 'Español' },
  fr: { dir: 'ltr', label: 'Français' },
  it: { dir: 'ltr', label: 'Italiano' },
  ar: { dir: 'rtl', label: 'العربية' },
  ja: { dir: 'ltr', label: '日本語' },
  zh: { dir: 'ltr', label: '中文' },
}
const supportedlocalesArray = Object.keys(supportedlocales)
const defaultLocale = 'en'

export { defaultLocale, getBrowserLocales, supportedlocales, supportedlocalesArray }
