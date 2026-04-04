import { Link, useLocation } from '@tanstack/react-router'
import { type VariantProps } from 'class-variance-authority'
import { ComponentProps, PropsWithChildren, useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { ButtonVariants } from '../button'

export function NavigationLink({
  className,
  dimension,
  mode,
  palette,
  ...linkOptions
}: PropsWithChildren<ComponentProps<typeof Link> & VariantProps<typeof ButtonVariants>>) {
  const { pathname } = useLocation()
  const [isActive, setActive] = useState(pathname === linkOptions.to)

  useEffect(() => {
    setActive(pathname === linkOptions.to)
  }, [pathname, linkOptions.to])

  return (
    <Link
      data-active={isActive}
      {...(isActive && { tabIndex: -1 })}
      {...linkOptions}
      className={cn(ButtonVariants({ className, dimension, mode, palette }), { 'pointer-events-none': isActive })}
    />
  )
}
