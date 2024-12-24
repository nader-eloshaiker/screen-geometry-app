import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom'
import { ButtonVariants } from '../button/ButtonVariants'

type Props = NavLinkProps &
  VariantProps<typeof ButtonVariants> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  TReactChildren
export const NavigationLink = ({ palette, dimension, mode, className, to, children, ...props }: Props) => {
  const { pathname } = useLocation()
  const [isActive, setActive] = useState(pathname === to)

  useEffect(() => {
    setActive(pathname === to)
  }, [pathname, to])

  return (
    <NavLink
      data-active={isActive}
      to={to}
      {...props}
      className={cn(ButtonVariants({ palette, dimension, mode, className }))}
    >
      {children}
    </NavLink>
  )
}
