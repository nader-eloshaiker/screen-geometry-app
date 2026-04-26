import ThemeToggle from '@/app/components/theme/ThemeToggle'
import { useEnvConfig } from '@/app/stores/config/useEnvConfig'
import { getTextDirection, TextDirection, TranslateMessage, useTranslation } from '@/app/stores/translation'
import { Button } from '@screengeometry/lib-ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@screengeometry/lib-ui/sheet'
import { cn } from '@screengeometry/lib-ui/utils'
import { Menu } from 'lucide-react'
import { useMemo, useState } from 'react'
import { HeaderNavLarge } from './HeaderNavLarge'
import { HeaderNavSmall } from './HeaderNavSmall'

const ThemeToggleStyled = ({ id }: { id: string }) => (
  <ThemeToggle className='self-center p-4 opacity-85 hover:opacity-100' id={id} />
)

const Title = ({ size, appTitle }: { size: 'sm' | 'lg'; appTitle: string }) => (
  <div
    className={cn('flex-1 text-center', {
      'text-2xl': size === 'lg',
      'text-xl': size === 'sm',
    })}
  >
    {appTitle}
  </div>
)

export default function Header() {
  const [open, setOpen] = useState(false)
  const { ENV_TYPE } = useEnvConfig()
  const { formatMessage } = useTranslation()
  const dir = getTextDirection()

  const appTitle = useMemo(
    () => `${formatMessage('header.title')}${ENV_TYPE === 'prod' ? '' : ` [${ENV_TYPE}]`}`,
    [ENV_TYPE, formatMessage]
  )

  return (
    <header className='bg-header text-header-foreground p-4 shadow-md'>
      <div className='flex items-center gap-6 lg:hidden' data-testid='small-header'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button mode='ghost' dimension='none' className='p-0'>
              <Menu className='size-10' />
              <span className='sr-only'>
                <TranslateMessage id='header.menu.title' />
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent dir={dir} side={dir === TextDirection.RTL ? 'right' : 'left'}>
            <SheetHeader>
              <SheetTitle className='text-left'>
                <TranslateMessage id='header.mobile.title' />
              </SheetTitle>
              <SheetDescription className='flex items-center gap-2 pt-4 text-left'>
                <ThemeToggleStyled id='theme-toggle' />
                <span>
                  <TranslateMessage id='header.menu.title' />
                </span>
              </SheetDescription>
            </SheetHeader>
            <HeaderNavSmall setOpen={setOpen} />
          </SheetContent>
        </Sheet>
        <Title size='lg' appTitle={appTitle} />
      </div>
      <div className='container mx-auto hidden lg:flex lg:flex-col lg:gap-2' data-testid='large-header'>
        <Title size='lg' appTitle={appTitle} />
        <div className='flex justify-between'>
          <HeaderNavLarge />
          <ThemeToggleStyled id='theme-toggle' />
        </div>
      </div>
    </header>
  )
}
