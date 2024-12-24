import { RouteSchema } from '@/app/routes/RouteSchema'
import { Button } from '@/lib/ui/components/button/Button'
import { NavigationLink } from '@/lib/ui/components/navigationlink/NavigationLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/lib/ui/components/sheet/Sheet'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import ThemeToggle from '../theme/ThemeToggle'

const ThemeToggleStyled = ({ id }: { id: string }) => (
  <ThemeToggle className='opacity-50 hover:opacity-100 md:mr-2' id={id} />
)

const Title = ({ size }: { size: 'sm' | 'lg' }) => (
  <div
    className={cn('flex-1 text-center', {
      'text-2xl': size === 'lg',
      'text-xl': size === 'sm',
    })}
  >
    {import.meta.env.VITE_APP_TITLE}
  </div>
)

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className='bg-card p-4 text-card-foreground shadow-md'>
      <div className='flex items-center gap-6 lg:hidden' data-testid='small-header'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button mode='ghost' dimension='none' className='p-0'>
              <Menu className='size-10' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle className='text-left'>Navigation</SheetTitle>
              <SheetDescription className='flex items-center gap-2 pt-4 text-left'>
                <ThemeToggleStyled id='theme-toggle' />
                <span>Theme Toggle</span>
              </SheetDescription>
            </SheetHeader>
            <div className='grid gap-6 py-6'>
              <NavigationLink
                to={RouteSchema.root.path}
                mode='ghost'
                className='justify-start text-lg font-semibold'
                onClick={() => setOpen(false)}
              >
                Home
              </NavigationLink>
              <NavigationLink
                to={RouteSchema.screens.path}
                mode='ghost'
                className='justify-start text-lg font-semibold'
                onClick={() => setOpen(false)}
              >
                Screens
              </NavigationLink>
              <NavigationLink
                to={RouteSchema.contact.path}
                mode='ghost'
                className='justify-start text-lg font-semibold'
                onClick={() => setOpen(false)}
              >
                Contact
              </NavigationLink>
              <NavigationLink
                to={RouteSchema.help.path}
                mode='ghost'
                className='justify-start text-lg font-semibold'
                onClick={() => setOpen(false)}
              >
                Help
              </NavigationLink>
            </div>
          </SheetContent>
        </Sheet>
        <Title size='lg' />
      </div>
      <div className='container mx-auto hidden lg:flex lg:flex-col' data-testid='large-header'>
        <Title size='lg' />
        <div className='flex justify-between'>
          <nav className='flex gap-6' data-testid='large-header-menu'>
            <NavigationLink
              mode='ghost'
              palette={'secondary'}
              to={RouteSchema.root.path}
              className='group w-24 text-base font-semibold'
            >
              Home
            </NavigationLink>
            <NavigationLink
              mode='ghost'
              palette={'secondary'}
              to={RouteSchema.screens.path}
              className='group w-24 text-base font-semibold'
            >
              Screens
            </NavigationLink>
            <NavigationLink
              mode='ghost'
              palette={'secondary'}
              to={RouteSchema.contact.path}
              className='group w-24 text-base font-semibold'
            >
              Contact
            </NavigationLink>
            <NavigationLink
              mode='ghost'
              palette={'secondary'}
              to={RouteSchema.help.path}
              className='group w-24 text-base font-semibold'
            >
              Help
            </NavigationLink>
          </nav>
          <ThemeToggleStyled id='theme-toggle' />
        </div>
      </div>
      {/* small header */}
      {/* <div className='flex w-full justify-between p-4 py-2 md:hidden' data-testid='small-header'>
        <motion.details
          data-testid='nav-menu'
          className={cn('dropdown dropdown-bottom', { 'dropdown-open': menuOpened })}
        >
          <summary tabIndex={0} className='btn btn-ghost p-0' role='button'>
            <HamburgerMenu width={20} height={14} isOpen={menuOpened} onClick={() => setMenuOpened(!menuOpened)} />
          </summary>
          <motion.ul
            tabIndex={0}
            // style={{ originX: 0, originY: 0 }}
            className='menu dropdown-content z-[1] mt-4 w-40 gap-4 rounded-md bg-mono text-mono-content shadow'
            initial='closed'
            animate={menuOpened ? 'opened' : 'closed'}
            exit='closed'
            variants={menuVariants}
          >
            <NavMenu pathname={pathname} />
          </motion.ul>
        </motion.details>
        <Title size='sm' />
        <ThemeToggleStyled id='themeToggleTiny' />
      </div> */}
      {/* large header */}
      {/* <div className='hidden p-4 md:flex data-testid='large-header'>
        <Title size='lg' />
        <div className='navbar min-h-0 justify-between p-0' data-testid='large-header-menu'>
          <ul className=' menu menu-horizontal gap-4 bg-accent p-0'>
            <NavMenu pathname={pathname} />
          </ul>
          <ThemeToggleStyled id='themeToggle' />
        </div>
      </div> */}
    </header>
  )
}
