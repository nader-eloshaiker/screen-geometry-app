import { TranslationKeyType } from '@/app/stores/translation'
import { ToOptions } from '@tanstack/react-router'

export type NavMenuItem = {
  type: 'link'
  linkOptions: ToOptions
  id: TranslationKeyType
}
export type NavMenuGroup = {
  type: 'group'
  groupOptions: NavMenuItem[]
  id: TranslationKeyType
}

export const Menu = [
  { type: 'link', linkOptions: { to: '/' }, id: 'header.menu.home' },
  { type: 'link', linkOptions: { to: '/myscreens' }, id: 'header.menu.myscreens' },
  {
    type: 'group',
    id: 'header.menu.presets',
    groupOptions: [
      { type: 'link', linkOptions: { to: '/preset/16by9' }, id: 'header.menu.preset16by9' },
      { type: 'link', linkOptions: { to: '/preset/21by9' }, id: 'header.menu.preset21by9' },
      { type: 'link', linkOptions: { to: '/preset/32by9' }, id: 'header.menu.preset32by9' },
      { type: 'link', linkOptions: { to: '/preset/pro' }, id: 'header.menu.presetPro' },
      {
        type: 'link',
        linkOptions: { to: '/preset/popular' },
        id: 'header.menu.presetPopular',
      },
      { type: 'link', linkOptions: { to: '/preset/gamer' }, id: 'header.menu.presetGaming' },
    ],
  },
  { type: 'link', linkOptions: { to: '/contact' }, id: 'header.menu.contact' },
  { type: 'link', linkOptions: { to: '/help' }, id: 'header.menu.help' },
] as const satisfies ReadonlyArray<NavMenuItem | NavMenuGroup>
