import { ToOptions } from '@tanstack/react-router'

export const Menu = [
  { linkOptions: { to: '/' }, id: 'header.large.home', defaultMessage: 'Home' },
  { linkOptions: { to: '/myscreens' }, id: 'header.large.screens', defaultMessage: 'My Screens' },
  { linkOptions: { to: '/contact' }, id: 'header.large.contact', defaultMessage: 'Contact' },
  { linkOptions: { to: '/help' }, id: 'header.large.help', defaultMessage: 'Help' },
] as const satisfies ReadonlyArray<{ linkOptions: ToOptions; id: string; defaultMessage: string }>

export const MenuSmall = [
  { linkOptions: { to: '/' }, id: 'header.small.home', defaultMessage: 'Home' },
  { linkOptions: { to: '/myscreens' }, id: 'header.small.screens', defaultMessage: 'My Screens' },
  { linkOptions: { to: '/contact' }, id: 'header.small.contact', defaultMessage: 'Contact' },
  { linkOptions: { to: '/help' }, id: 'header.small.help', defaultMessage: 'Help' },
] as const satisfies ReadonlyArray<{ linkOptions: ToOptions; id: string; defaultMessage: string }>
