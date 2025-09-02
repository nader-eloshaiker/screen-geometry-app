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

export const supportedLanguagesArray: Array<string> = [
  'en', // English
  'de', // German
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'pt', // Portuguese
  'ar', // Arabic
  'fa', // Farsi
  'hi', // Hindi
  'ja', // Japanese
  'ko', // Korean
  'ta', // Tamil
  'zh', // Chinese
]
export const defaultLLanguage = 'en'

const supportedlocales: Record<string, { dir: 'ltr' | 'rtl'; label: string }> = {
  'en-US': { dir: 'ltr', label: 'English' },
  'de-DE': { dir: 'ltr', label: 'Deutsch' },
  'es-ES': { dir: 'ltr', label: 'Español' },
  'fr-FR': { dir: 'ltr', label: 'Français' },
  'it-IT': { dir: 'ltr', label: 'Italiano' },
  'pt-PT': { dir: 'ltr', label: 'Português' },
  'ar-SA': { dir: 'rtl', label: 'العربية' },
  'fa-IR': { dir: 'rtl', label: 'فارسی' },
  'hi-IN': { dir: 'ltr', label: 'हिंदी' },
  'ja-JP': { dir: 'ltr', label: '日本語' },
  'ko-KR': { dir: 'ltr', label: '한국어' },
  'ta-IN': { dir: 'ltr', label: 'தமிழ்' },
  'zh-CN': { dir: 'ltr', label: '中文' },
}
const supportedlocalesArray = Object.keys(supportedlocales)
const defaultLocale = 'en-US'

const getTextDirection = () => document.dir ?? 'ltr'
const setTextDirection = (dir: 'ltr' | 'rtl') => (document.dir = dir)

export { defaultLocale, getBrowserLocales, getTextDirection, setTextDirection, supportedlocales, supportedlocalesArray }
