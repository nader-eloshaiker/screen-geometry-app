import { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { TRANSLATION_KEYS } from './TranslationStore'
import { TranslationKeyType } from './TranslationTypes'

export const useTranslation = () => {
  const { formatMessage } = useIntl()

  const typedFormatMessage = useCallback(
    (id: TranslationKeyType) => {
      return formatMessage({
        id,
        defaultMessage: TRANSLATION_KEYS[id].defaultMessage,
      })
    },
    [formatMessage]
  )

  return useMemo(() => ({ formatMessage: typedFormatMessage }), [typedFormatMessage])
}
