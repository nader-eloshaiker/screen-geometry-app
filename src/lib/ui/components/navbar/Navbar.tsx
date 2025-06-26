/**
 * v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Menu } from 'lucide-react'
import { Button } from '../button/Button'
import { NavigationLink } from '../navigationlink/NavigationLink'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../sheet/Sheet'

export const Navbar = () => {
  return (
    <header className='h-20 w-full shrink-0 px-4 md:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button mode='ghost' dimension='none' className='p-0.5 lg:hidden'>
            <Menu className='size-10' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>Main Menu</SheetTitle>
            {/* <SheetDescription>Make changes to your profile here. Click save when you&lsquo;re done.</SheetDescription> */}
          </SheetHeader>
          <div className='grid gap-2 py-6'>
            <NavigationLink to='/' mode='link' className='justify-start text-lg font-semibold'>
              Home
            </NavigationLink>
            <NavigationLink to='/' mode='link' className='justify-start text-lg font-semibold'>
              About
            </NavigationLink>
            <NavigationLink to='/help' mode='link' className='justify-start text-lg font-semibold'>
              Services
            </NavigationLink>
            <NavigationLink to='/contact' mode='link' className='justify-start text-lg font-semibold'>
              Contact
            </NavigationLink>
          </div>
        </SheetContent>
      </Sheet>
      <nav className='ml-auto hidden gap-6 lg:flex'>
        <NavigationLink
          to='/'
          className='group w-24'
          // className='group data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50'
        >
          Home
        </NavigationLink>
        <NavigationLink to='/' className='group w-24'>
          About
        </NavigationLink>
        <NavigationLink to='/help' className='group w-24'>
          Services
        </NavigationLink>
        <NavigationLink to='/contact' className='group w-24'>
          Contact
        </NavigationLink>
      </nav>
    </header>
  )
}
