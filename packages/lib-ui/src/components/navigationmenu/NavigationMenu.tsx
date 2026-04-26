/* eslint-disable react-refresh/only-export-components */
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/lib/utils'

function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot='navigation-menu'
      data-viewport={viewport}
      className={cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot='navigation-menu-list'
      className={cn('group flex flex-1 list-none items-center justify-center gap-3', className)}
      {...props}
    />
  )
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item data-slot='navigation-menu-item' className={cn('relative', className)} {...props} />
  )
}

const navigationMenuTriggerStyle = cva([
  // Base styles
  'group inline-flex w-max items-center justify-center rounded-sm px-4 py-2 text-sm font-medium outline-none transition-[color,box-shadow]',

  // Hover states
  'hover:bg-navigation-hover hover:text-navigation-foreground-hover',

  // Focus states
  'focus:bg-navigation focus:text-navigation-foreground focus-visible:ring-navigation-ring focus-visible:outline-1 focus-visible:ring-[3px]',

  // Open state styles
  'data-[active=true]:bg-navigation-active data-[active=true]:text-navigation-foreground-active',
  'data-[state=open]:bg-navigation-hover data-[state=open]:text-navigation-foreground-hover',
  'data-[state=open]:hover:bg-navigation-hover data-[state=open]:focus:bg-navigation-hover',

  // Disabled states
  'disabled:pointer-events-none disabled:opacity-50',
])

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot='navigation-menu-trigger'
      className={cn(navigationMenuTriggerStyle(), 'group', className)}
      {...props}
    >
      <div className='grow'>{children}</div>
      <ChevronDownIcon
        className='relative top-[1px] ml-1 size-4 transition duration-300 group-data-[state=open]:rotate-180'
        aria-hidden='true'
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot='navigation-menu-content'
      className={cn(
        // Position and layout
        'left-0 top-0 w-full p-2 pr-2.5 md:absolute md:w-auto',

        // Motion and animations
        'data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out',

        // Viewport-specific styling
        'border-popover-border',
        'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground',

        // Viewport-specific positioning and sizing
        'group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200',

        // Viewport-specific animations
        'group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95',

        // Link focus states
        '**:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',

        className
      )}
      {...props}
    />
  )
}

function NavigationMenuViewport({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
  return (
    <div className={cn('absolute left-0 top-full isolate z-50 flex justify-center')}>
      <NavigationMenuPrimitive.Viewport
        data-slot='navigation-menu-viewport'
        className={cn(
          'origin-top-center bg-header text-header-foreground data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
          className
        )}
        {...props}
      />
    </div>
  )
}

function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot='navigation-menu-link'
      className={cn(
        // Base layout and styling
        'flex flex-col items-center justify-center gap-1 rounded-sm px-4 py-2 text-sm outline-none transition-all',

        // Hover states
        'hover:bg-navigation-hover hover:text-navigation-foreground-hover',

        // Focus states
        'focus:bg-navigation-hover focus:text-navigation-foreground-hover focus-visible:ring-navigation-ring focus-visible:outline-1 focus-visible:ring-[3px]',

        // Active states
        'data-[active=true]:bg-navigation-active data-[active=true]:text-navigation-foreground-active data-[active=true]:hover:bg-navigation-active data-[active=true]:focus:bg-navigation-active',

        // SVG styling
        "[&_svg:not([class*='text-'])]:text-foreground [&_svg:not([class*='size-'])]:size-4",

        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot='navigation-menu-indicator'
      className={cn(
        'data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:animate-in data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      <div className='bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md' />
    </NavigationMenuPrimitive.Indicator>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
}
