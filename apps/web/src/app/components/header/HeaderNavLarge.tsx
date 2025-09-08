import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'
import { FormattedMessage } from 'react-intl'

export const HeaderNavLarge = () => (
  <nav aria-label='Main' className='flex gap-6' data-testid='large-header-menu'>
    <NavigationLink mode='ghost' palette='navigation' to='/' className='group w-24 text-base font-semibold'>
      <FormattedMessage id='header.large.home' defaultMessage='Home' />
    </NavigationLink>
    <NavigationLink mode='ghost' palette='navigation' to='/screens' className='group w-24 text-base font-semibold'>
      <FormattedMessage id='header.large.screens' defaultMessage='Screens' />
    </NavigationLink>
    <NavigationLink mode='ghost' palette='navigation' to='/contact' className='group w-24 text-base font-semibold'>
      <FormattedMessage id='header.large.contact' defaultMessage='Contact' />
    </NavigationLink>
    <NavigationLink mode='ghost' palette='navigation' to='/help' className='group w-24 text-base font-semibold'>
      <FormattedMessage id='header.large.help' defaultMessage='Help' />
    </NavigationLink>
  </nav>
)
