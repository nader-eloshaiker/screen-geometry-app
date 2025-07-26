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

const supportedlocales = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ar: 'العربية',
  ja: '日本語',
  zh: '中文',
}
const supportedlocalesArray = Object.keys(supportedlocales)
const defaultLocale = 'en'

export { defaultLocale, getBrowserLocales, supportedlocales, supportedlocalesArray }
