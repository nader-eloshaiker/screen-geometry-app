import { useIntl } from 'react-intl'
import { TRANSLATION_KEYS } from './TranslationStore'
import { TranslationKeyType } from './TranslationTypes'

export const useTranslation = () => {
  const { formatMessage } = useIntl()

  const typedFormatMessage = (id: TranslationKeyType) => {
    return formatMessage({
      id,
      defaultMessage: TRANSLATION_KEYS[id].defaultMessage,
    })
  }

  return {
    formatMessage: typedFormatMessage,
  }
}
