import { TRANSLATION_KEYS } from './TranslationStore'

export type TranslationKeyType = keyof typeof TRANSLATION_KEYS

export const TranslationKeys = (() => {
  const keys = {} as Record<TranslationKeyType, TranslationKeyType>

  for (const key of Object.keys(TRANSLATION_KEYS) as TranslationKeyType[]) {
    keys[key] = key
  }

  return keys as Readonly<Record<TranslationKeyType, TranslationKeyType>>
})()
