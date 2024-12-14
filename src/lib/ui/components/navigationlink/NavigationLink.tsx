import { cn } from '@/lib/utils/class-name'
import { VariantProps } from 'class-variance-authority'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { ButtonVariants } from '../button/ButtonVariants'

type Props = NavLinkProps &
  VariantProps<typeof ButtonVariants> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  TReactChildren
export const NavigationLink = ({ palette, dimension, mode, className, to, children, ...props }: Props) => {
  return (
    <NavLink to={to} {...props} className={cn(ButtonVariants({ palette, dimension, mode, className }))}>
      {children}
    </NavLink>
  )
}
