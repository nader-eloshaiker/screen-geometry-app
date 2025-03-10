import { NavigationLink } from '@/lib/ui/components/navigationlink/NavigationLink'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const HeaderNavSmall = ({ setOpen }: Props) => (
  <nav aria-label='Main' className='grid gap-6 py-6'>
    <NavigationLink to='/' mode='ghost' className='justify-start text-lg font-semibold' onClick={() => setOpen(false)}>
      Home
    </NavigationLink>
    <NavigationLink
      to='/screens'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      Screens
    </NavigationLink>
    <NavigationLink
      to='/contact'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      Contact
    </NavigationLink>
    <NavigationLink
      to='/help'
      mode='ghost'
      className='justify-start text-lg font-semibold'
      onClick={() => setOpen(false)}
    >
      Help
    </NavigationLink>
  </nav>
)
