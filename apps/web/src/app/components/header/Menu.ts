import { ToOptions } from '@tanstack/react-router'

export type NavMenuItem = {
  type: 'link'
  linkOptions: ToOptions
  id: string
  defaultMessage: string
}
export type NavMenuGroup = {
  type: 'group'
  groupOptions: NavMenuItem[]
  id: string
  defaultMessage: string
}

export const Menu = [
  { type: 'link', linkOptions: { to: '/' }, id: 'header.large.home', defaultMessage: 'Home' },
  { type: 'link', linkOptions: { to: '/myscreens' }, id: 'header.large.screens', defaultMessage: 'My Screens' },
  {
    type: 'group',
    groupOptions: [
      { type: 'link', linkOptions: { to: '/preset/16by9' }, id: 'header.large.preset16by9', defaultMessage: '16:9' },
      { type: 'link', linkOptions: { to: '/preset/21by9' }, id: 'header.large.preset21by9', defaultMessage: '21:9' },
      { type: 'link', linkOptions: { to: '/preset/32by9' }, id: 'header.large.preset32by9', defaultMessage: '32:9' },
      { type: 'link', linkOptions: { to: '/preset/pro' }, id: 'header.large.presetPro', defaultMessage: 'Pro' },
      {
        type: 'link',
        linkOptions: { to: '/preset/popular' },
        id: 'header.large.presetPopular',
        defaultMessage: 'Popular',
      },
      { type: 'link', linkOptions: { to: '/preset/gamer' }, id: 'header.large.presetGamer', defaultMessage: 'Gamer' },
    ],
    id: 'header.large.presets',
    defaultMessage: 'Presets',
  },
  { type: 'link', linkOptions: { to: '/contact' }, id: 'header.large.contact', defaultMessage: 'Contact' },
  { type: 'link', linkOptions: { to: '/help' }, id: 'header.large.help', defaultMessage: 'Help' },
] as const satisfies ReadonlyArray<NavMenuItem | NavMenuGroup>

export const MenuSmall = [
  { type: 'link', linkOptions: { to: '/' }, id: 'header.small.home', defaultMessage: 'Home' },
  { type: 'link', linkOptions: { to: '/myscreens' }, id: 'header.small.screens', defaultMessage: 'My Screens' },
  {
    type: 'group',
    groupOptions: [
      { type: 'link', linkOptions: { to: '/preset/16by9' }, id: 'header.small.preset16by9', defaultMessage: '16:9' },
      { type: 'link', linkOptions: { to: '/preset/21by9' }, id: 'header.small.preset21by9', defaultMessage: '21:9' },
      { type: 'link', linkOptions: { to: '/preset/32by9' }, id: 'header.small.preset32by9', defaultMessage: '32:9' },
      { type: 'link', linkOptions: { to: '/preset/pro' }, id: 'header.small.presetPro', defaultMessage: 'Pro' },
      {
        type: 'link',
        linkOptions: { to: '/preset/popular' },
        id: 'header.small.presetPopular',
        defaultMessage: 'Popular',
      },
      { type: 'link', linkOptions: { to: '/preset/gamer' }, id: 'header.small.presetFamer', defaultMessage: 'Gamer' },
    ],
    id: 'header.small.presets',
    defaultMessage: 'Presets',
  },
  { type: 'link', linkOptions: { to: '/contact' }, id: 'header.small.contact', defaultMessage: 'Contact' },
  { type: 'link', linkOptions: { to: '/help' }, id: 'header.small.help', defaultMessage: 'Help' },
] as const satisfies ReadonlyArray<NavMenuItem | NavMenuGroup>
