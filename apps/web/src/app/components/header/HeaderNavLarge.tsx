import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'
import { FormattedMessage } from 'react-intl'
import { Menu } from './Menu'

export const HeaderNavLarge = () => (
  <nav aria-label='Main' className='flex gap-6' data-testid='large-header-menu'>
    {Menu.map((route) => (
      <NavigationLink
        key={route.id}
        mode='ghost'
        palette='navigation'
        {...route.linkOptions}
        className='group min-w-24 text-base font-semibold'
      >
        <FormattedMessage id={route.id} defaultMessage={route.defaultMessage} />
      </NavigationLink>
    ))}
  </nav>
)
