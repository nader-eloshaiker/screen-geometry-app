import ThemeToggle from '@/app/components/theme/ThemeToggle'
import { cn } from '@/lib/utils'
import { Button } from '@screengeometry/lib-ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@screengeometry/lib-ui/sheet'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { HeaderNavLarge } from './HeaderNavLarge'
import { HeaderNavSmall } from './HeaderNavSmall'

const ThemeToggleStyled = ({ id }: { id: string }) => (
  <ThemeToggle className='self-center opacity-50 hover:opacity-100 md:mr-2' id={id} />
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
    <header className='bg-header p-4 text-header-foreground shadow-md'>
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
            <HeaderNavSmall setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <Title size='lg' />
      </div>
      <div className='container mx-auto hidden lg:flex lg:flex-col' data-testid='large-header'>
        <Title size='lg' />
        <div className='flex justify-between'>
          <HeaderNavLarge />
          <ThemeToggleStyled id='theme-toggle' />
        </div>
      </div>
    </header>
  )
}
