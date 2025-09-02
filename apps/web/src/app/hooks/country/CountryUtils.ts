export const supportedLanguageCodes: Array<string> = [
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

export const supportedlocales: Record<string, { dir: 'ltr' | 'rtl'; label: string }> = {
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

export const defaultLanguage = 'en'
export const defaultLocale = 'en-US'
