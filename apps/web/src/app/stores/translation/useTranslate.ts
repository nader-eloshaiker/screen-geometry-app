import { useIntl } from 'react-intl'
import { TranslationKeyType } from './TranslationTypes'
import { TRANSLATION_KEYS } from './Translationkeys'

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
