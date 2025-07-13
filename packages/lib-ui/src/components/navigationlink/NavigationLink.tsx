import { TReactChildren } from '@/types/types'
import { Link, LinkProps, useLocation } from '@tanstack/react-router'
import { VariantProps } from 'class-variance-authority'
import { useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { ButtonVariants } from '../button'

type Props = LinkProps &
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
    <Link
      data-active={isActive}
      to={to}
      {...props}
      className={cn(ButtonVariants({ palette, dimension, mode, className }))}
    >
      {children}
    </Link>
  )
}
