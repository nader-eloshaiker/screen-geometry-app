import { FormattedMessage } from 'react-intl'
import { TRANSLATION_KEYS } from './TranslationStore'
import { TranslationKeyType } from './TranslationTypes'

export const TranslateMessage = ({
  id,
  ...props
}: Omit<React.ComponentProps<typeof FormattedMessage>, 'id' | 'defaultMessage'> & { id: TranslationKeyType }) => {
  return <FormattedMessage id={id} {...props} defaultMessage={TRANSLATION_KEYS[id].defaultMessage} />
}
