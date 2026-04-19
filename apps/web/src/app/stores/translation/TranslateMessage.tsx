import { FormattedMessage } from 'react-intl'
import { TranslationKeyType } from './TranslationTypes'
import { TRANSLATION_KEYS } from './Translationkeys'

export const TranslateMessage = ({
  id,
  ...props
}: Omit<React.ComponentProps<typeof FormattedMessage>, 'id' | 'defaultMessage'> & { id: TranslationKeyType }) => {
  return <FormattedMessage id={id} {...props} defaultMessage={TRANSLATION_KEYS[id].defaultMessage} />
}
