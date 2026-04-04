import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'
import type { Dispatch, SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'
import { MenuSmall } from './Menu'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const HeaderNavSmall = ({ setOpen }: Props) => (
  <nav aria-label='Main' className='grid gap-6 py-6'>
    {MenuSmall.map((route) => (
      <NavigationLink
        {...route.linkOptions}
        mode='ghost'
        className='justify-start text-lg font-semibold'
        onClick={() => setOpen(false)}
      >
        <FormattedMessage
          id={route.id}
          defaultMessage={route.defaultMessage}
          description={`Header small ${route.id} link`}
        />
      </NavigationLink>
    ))}
  </nav>
)
