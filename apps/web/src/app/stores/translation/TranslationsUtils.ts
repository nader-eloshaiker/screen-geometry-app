export const getBrowserLocales = () => {
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

export const getTextDirection = () => document.dir ?? 'ltr'
export const setTextDirection = (dir: 'ltr' | 'rtl') => (document.dir = dir)
