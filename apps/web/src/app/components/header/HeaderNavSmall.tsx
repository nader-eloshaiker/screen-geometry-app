import { getTextDirection, TextDirection, TranslateMessage } from '@/app/stores/translation'
import { Button, ButtonVariants } from '@screengeometry/lib-ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@screengeometry/lib-ui/collapsible'
import { cn } from '@screengeometry/lib-ui/utils'
import { Link, useMatchRoute } from '@tanstack/react-router'
import { Check, ChevronDown } from 'lucide-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Menu } from './Menu'

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MenuItem = ({
  to,
  children,
  setOpen,
  className,
}: {
  to: string
  children: React.ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  className?: string
}) => {
  const matchRoute = useMatchRoute()
  const isActive = !!matchRoute({ to, fuzzy: true })

  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      data-active={isActive}
      className={cn(
        ButtonVariants({ mode: 'ghost' }),
        'w-full justify-between',
        isActive && 'pointer-events-none',
        className
      )}
    >
      <span className='text-left'>{children}</span>
      {isActive ? <Check className='text-primary-foreground size-4' /> : <div className='size-4' />}
    </Link>
  )
}

const SubMenuItem = ({
  to,
  children,
  setOpen,
  className,
}: {
  to: string
  children: React.ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  className?: string
}) => {
  const matchRoute = useMatchRoute()
  const isActive = !!matchRoute({ to })

  return (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      data-active={isActive}
      className={cn(
        ButtonVariants({ mode: 'ghost' }),
        'w-full justify-between',
        isActive && 'pointer-events-none',
        className
      )}
    >
      <span>{children}</span>
      {isActive ? <Check className='text-primary-foreground size-6' /> : <div className='size-6' />}
    </Link>
  )
}

const SubMenu = ({
  title,
  children,
  defaultExpanded = false,
}: {
  title: React.ReactNode
  children: React.ReactNode
  defaultExpanded?: boolean
}) => {
  const [open, setOpen] = useState(defaultExpanded)
  const dir = getTextDirection()

  return (
    <Collapsible defaultOpen={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <Button mode='ghost' className='felx group w-full justify-between gap-6 active:bg-transparent'>
          <div className='text-left'>{title}</div>
          <ChevronDown className='h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180' />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={cn(
          'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down space-y-1 overflow-hidden',
          dir === TextDirection.RTL ? 'pr-6' : 'pl-6'
        )}
      >
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}

export const HeaderNavSmall = ({ setOpen }: Props) => {
  const matchRoute = useMatchRoute()
  const isPresetActive = !!matchRoute({ to: '/preset', fuzzy: true })

  return (
    <nav aria-label='Main' className='flex flex-col space-y-1 px-4' data-testid='small-header-menu'>
      {Menu.map((route) =>
        route.type === 'link' ? (
          <MenuItem key={route.id} to={route.linkOptions.to} setOpen={setOpen}>
            <TranslateMessage id={route.id} />
          </MenuItem>
        ) : (
          <SubMenu key={route.id} title={<TranslateMessage id={route.id} />} defaultExpanded={isPresetActive}>
            {route.groupOptions.map((item) => (
              <SubMenuItem key={item.id} to={item.linkOptions.to} setOpen={setOpen}>
                <TranslateMessage id={item.id} />
              </SubMenuItem>
            ))}
          </SubMenu>
        )
      )}
    </nav>
  )
}
