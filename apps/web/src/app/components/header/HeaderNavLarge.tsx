import { NavigationLink } from '@screengeometry/lib-ui/navigationlink'

export const HeaderNavLarge = () => (
  <nav aria-label='Main' className='flex gap-6' data-testid='large-header-menu'>
    <NavigationLink mode='ghost' palette={'secondary'} to='/' className='group w-24 text-base font-semibold'>
      Home
    </NavigationLink>
    <NavigationLink mode='ghost' palette={'secondary'} to='/screens' className='group w-24 text-base font-semibold'>
      Screens
    </NavigationLink>
    <NavigationLink mode='ghost' palette={'secondary'} to='/contact' className='group w-24 text-base font-semibold'>
      Contact
    </NavigationLink>
    <NavigationLink mode='ghost' palette={'secondary'} to='/help' className='group w-24 text-base font-semibold'>
      Help
    </NavigationLink>
  </nav>
)
