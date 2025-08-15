import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'
import type { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const HeaderNavSmall = ({ setOpen }: Props) => (
  <nav aria-label='Main' className='grid gap-6 py-6'>
    <NavigationLink to='/' mode='ghost' className='justify-start text-lg font-semibold' onClick={() => setOpen(false)}>
      <FormattedMessage id='header.small.home' defaultMessage='Home' description='Header small home link' />
    </NavigationLink>
    <NavigationLink
      to='/screens'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      <FormattedMessage id='header.small.screens' defaultMessage='Screens' />
    </NavigationLink>
    <NavigationLink
      to='/contact'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      <FormattedMessage id='header.small.contact' defaultMessage='Contact' />
    </NavigationLink>
    <NavigationLink
      to='/help'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      <FormattedMessage id='header.small.help' defaultMessage='Help' />
    </NavigationLink>
  </nav>
)
