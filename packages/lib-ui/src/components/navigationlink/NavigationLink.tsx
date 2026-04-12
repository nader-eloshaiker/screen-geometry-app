import { Link, LinkProps } from '@tanstack/react-router'
import { type VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { cn } from '../../lib/utils'
import { ButtonVariants } from '../button'

export function NavigationLink({
  className,
  dimension,
  mode,
  palette,
  ...linkOptions
}: PropsWithChildren<LinkProps & VariantProps<typeof ButtonVariants> & { className?: string }>) {
  return <Link {...linkOptions} className={cn(ButtonVariants({ dimension, mode, palette }), className)} />
}
