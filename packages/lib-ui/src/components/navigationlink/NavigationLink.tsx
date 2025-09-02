import { Link, useLocation } from '@tanstack/react-router'
import { type VariantProps } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { ButtonVariants } from '../button'

export function NavigationLink({
  className,
  dimension,
  mode,
  palette,
  to,
  ...props
}: React.ComponentProps<typeof Link> & VariantProps<typeof ButtonVariants>) {
  const { pathname } = useLocation()
  const [isActive, setActive] = useState(pathname === to)

  useEffect(() => {
    setActive(pathname === to)
  }, [pathname, to])

  return (
    <Link
      data-active={isActive}
      to={to}
      {...(isActive && { tabIndex: -1 })}
      {...props}
      className={cn(ButtonVariants({ className, dimension, mode, palette }), { 'pointer-events-none': isActive })}
    />
  )
}
