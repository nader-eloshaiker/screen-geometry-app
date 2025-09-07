import { LightMode, type TThemeMode } from '@/app/stores/theme/Theme.types'
import { type Dispatch, type SetStateAction, createContext } from 'react'

export const ThemeContext = createContext<Readonly<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>>([
  LightMode,
  () => {},
])
