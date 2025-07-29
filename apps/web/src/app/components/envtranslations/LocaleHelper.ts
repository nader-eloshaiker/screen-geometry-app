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
  'en-US': { dir: 'ltr', label: 'English' },
  'de-DE': { dir: 'ltr', label: 'Deutsch' },
  'es-ES': { dir: 'ltr', label: 'Español' },
  'fr-FR': { dir: 'ltr', label: 'Français' },
  'it-IT': { dir: 'ltr', label: 'Italiano' },
  'ar-SA': { dir: 'rtl', label: 'العربية' },
  'fa-IR': { dir: 'rtl', label: 'فارسی' },
  'ja-JP': { dir: 'ltr', label: '日本語' },
  'zh-CN': { dir: 'ltr', label: '中文' },
}
const supportedlocalesArray = Object.keys(supportedlocales)
const defaultLocale = 'en-US'

export { defaultLocale, getBrowserLocales, supportedlocales, supportedlocalesArray }
