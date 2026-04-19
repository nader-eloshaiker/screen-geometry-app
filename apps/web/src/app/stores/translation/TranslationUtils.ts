export const TextDirection = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const

export type TextDirection = (typeof TextDirection)[keyof typeof TextDirection]

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

export const getTextDirection = (): TextDirection => (document.dir as TextDirection) ?? TextDirection.LTR
export const setTextDirection = (dir: TextDirection) => (document.dir = dir)
