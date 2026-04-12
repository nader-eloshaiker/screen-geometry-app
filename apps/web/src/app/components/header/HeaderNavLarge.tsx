import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@screengeometry/lib-ui/navigationmenu'
import { cn } from '@screengeometry/lib-ui/utils'
import { Link, ToOptions, useMatchRoute } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { PropsWithChildren } from 'react'
import { FormattedMessage } from 'react-intl'
import { Menu } from './Menu'

const NavLink = ({ className, children, ...linkOptions }: PropsWithChildren<ToOptions & { className?: string }>) => {
  const matchRoute = useMatchRoute()
  const isActive = !!matchRoute({ ...linkOptions, fuzzy: true })

  return (
    <NavigationMenuLink
      asChild
      className={cn(
        {
          'pointer-events-none': isActive,
        },
        'text-base font-semibold',
        className
      )}
    >
      <Link data-active={isActive} {...(isActive && { tabIndex: -1 })} {...linkOptions}>
        {children}
      </Link>
    </NavigationMenuLink>
  )
}

const SubMenuNavLink = ({
  className,
  children,
  ...linkOptions
}: PropsWithChildren<ToOptions & { className?: string }>) => {
  const matchRoute = useMatchRoute()
  const isActive = !!matchRoute({ ...linkOptions })
  console.log('isPresetActive', isActive, linkOptions.to)

  return (
    <NavigationMenuLink
      asChild
      data-active={isActive}
      className={cn(
        {
          'pointer-events-none': isActive,
        },
        'text-base font-semibold',
        'data-[active=true]:text-popover-foreground-muted data-[active=true]:bg-transparent',
        className
      )}
    >
      <Link data-active={isActive} {...(isActive && { tabIndex: -1 })} {...linkOptions}>
        <div className='flex w-full flex-row items-center justify-between'>
          <div>{children}</div>
          {isActive ? <Check className='text-popover-foreground-muted size-4' /> : <div className='size-4' />}
        </div>
      </Link>
    </NavigationMenuLink>
  )
}

export const HeaderNavLarge = () => {
  const matchRoute = useMatchRoute()
  const isPresetActive = !!matchRoute({ to: '/preset', fuzzy: true })

  return (
    // <nav aria-label='Main' className='flex gap-6' data-testid='large-header-menu'>
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        {Menu.map((route) =>
          route.type === 'link' ? (
            <NavigationMenuItem key={route.id}>
              <NavLink {...route.linkOptions} className='min-w-28'>
                <FormattedMessage id={route.id} defaultMessage={route.defaultMessage} />
              </NavLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={route.id}>
              <NavigationMenuTrigger data-active={isPresetActive} className='min-w-28 text-base font-semibold'>
                <FormattedMessage id={route.id} defaultMessage={route.defaultMessage} />
              </NavigationMenuTrigger>
              <NavigationMenuContent className='relative z-10'>
                <ul className='w-40'>
                  {route.groupOptions.map((item) => (
                    <li key={item.id}>
                      <SubMenuNavLink {...item.linkOptions} className='w-full'>
                        <FormattedMessage id={item.id} defaultMessage={item.defaultMessage} />
                      </SubMenuNavLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
    // </nav>
  )
}
